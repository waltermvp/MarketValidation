import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';

import { env } from '$amplify/env/confirm-newsletter';
import type { Schema } from '../../data/resource';
import { updateUser } from '../signUp-newsletter/graphql/mutations';
import { listUserByConfirmationCodeAndCreatedAt } from '../signUp-newsletter/graphql/queries';
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: 'identityPool',
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

const dataClient = generateClient<Schema>();

export const handler: Schema['confirmNewsletter']['functionHandler'] = async (
  event,
  _context
) => {
  const { confirmationCode } = event.arguments;

  if (!confirmationCode) {
    return {
      success: false,
      message: 'Confirmation code is required',
    };
  }

  try {
    // Find user with the confirmation code
    const result = await dataClient.graphql({
      query: listUserByConfirmationCodeAndCreatedAt,
      variables: {
        confirmationCode,
      },
    });

    const users = result.data?.listUserByConfirmationCodeAndCreatedAt?.items;

    if (!users || users.length === 0) {
      return {
        success: false,
        message: 'Invalid confirmation code',
      };
    }

    const user = users[0];

    if (user.confirmed) {
      return {
        success: false,
        message: 'Email already confirmed',
      };
    }

    // Update user to confirmed status
    await dataClient.graphql({
      query: updateUser,
      variables: {
        input: {
          email: user.email,
          confirmed: true,
          confirmationCode: 'CONFIRMED',
        },
      },
    });

    return {
      success: true,
      message: 'Email confirmed successfully',
    };
  } catch (error) {
    console.error('Error confirming email:', error);
    return {
      success: false,
      message: 'Failed to confirm email',
    };
  }
};
