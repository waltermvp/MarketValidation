import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { randomBytes } from 'crypto';
import {
  S3Client,
  GetObjectCommand,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    sessionToken: env.AWS_SESSION_TOKEN,
  },
} as S3ClientConfig);

// eslint-disable-next-line import/no-unresolved
import { env } from '$amplify/env/signUp-newsletter';

import type { Schema } from '../../data/resource';
import { createUser } from './graphql/mutations';
import { html as welcomeHTML } from './welcome.json';

const emailFrom = 'contact@alfajoresny.com';
Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT, // replace with your defineData name
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
const ses = new SESClient({ region: env.AWS_REGION });
const htmlOutput = welcomeHTML;

// eslint-disable-next-line max-lines-per-function
export const handler: Schema['signUpNewsletter']['functionHandler'] = async (
  event,
  _context
) => {
  const { email, lang, callbackURL, country, zip } = event.arguments;
  console.log('arguments in handler', JSON.stringify(event.arguments, null, 2));

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  try {
    // Create user in database
    console.log('creating user in database');

    await dataClient.graphql({
      query: createUser,
      variables: {
        input: {
          email: email,
          country: country ? country : undefined,
          zip: zip ? zip : undefined,
        },
      },
    });
    console.log('user created in database');
    const host = callbackURL === 'localhost:8081' ? 'http://' : 'https://';
    const footerURL = await getEmailImageUrl('email-images/footer.png');
    console.log(footerURL, 'footerurl');
    // Send welcome email
    const templateValues = {
      EmailTitle: 'Welcome to MapYourHealth - Confirm Your Subscription',
      HeaderImage: footerURL,
      WelcomeHeader: 'Thanks for signing up!',
      LoginButtonText: 'Confirm Subscription',
      LoginButtonUrl: `${host}${callbackURL}/user/`,
      SignatureText: 'Thanks,',
      SignatureCompany: 'The MapYourHealth Team',
      MainTextColor: '#9db835',
      EmailBackgroundColor: '#7D2020',
      HeaderBackgroundColor: '#ffffff',
      ContentBackgroundColor: '#ffffff',
      MainBackgroundColor: '#9db835',
      TableHeaderBackgroundColor: '#f8f9fa',
      HeaderTextColor: '#000000',
      HighlightTextColor: '#ffffff',
      FooterTextColor: '#ffffff',
      FontFamily: 'Arial, sans-serif',
      greeting: 'Dear friend,',
      thankYouMessage: 'Thank you for taking care of your health.',
      cityMessage: `Currently, New York is not in our database. But rest assured that we will notify you via email as soon as we have mapped your neighborhood.`,
      mainMessage:
        'Monitoring environmental health is essential for a safer and healthier world. By identifying and addressing local health hazards, you can prevent chronic illnesses, reduce exposure to harmful pollutants, and ensure access to clean air, water, and safe living conditions.',
      followUpMessage:
        'In doing so, you can protect the well-being of current and future generations.',
      inviteMessage:
        'Help us save more lives by inviting family and friends to Sign Up at',
      websiteUrl: 'MapYourHealth.info',
      closingMessage: 'Wishing you a long and fulfilling life.',
      footerSignature: 'The MapYourHealth team',
      footerURL: footerURL,
    };

    const finalHtml = generateHtmlString(templateValues);

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: { Data: finalHtml },
        },
        Subject: {
          Data: 'Welcome to MapYourHealth Newsletter',
        },
      },
      Source: emailFrom,
    });

    await ses.send(sendEmailCommand);
    console.log('email sent');
    return { success: true };
  } catch (error) {
    console.log('error in handler', error);
    // Ensure the error is properly typed or checked
    if (error && typeof error === 'object' && 'errors' in error) {
      const errorArray = (error as { errors: { errorType: string }[] }).errors;
      if (errorArray && errorArray.length > 0) {
        const errorTypeString = errorArray[0].errorType;

        if (
          errorTypeString.includes('DynamoDB:ConditionalCheckFailedException')
        ) {
          return {
            success: false,
            message:
              'A user with your email address has already been subscribed for updates.',
          };
        }
      }
    }

    console.log('error in handler', error);
    return { success: false, message: 'Failed to process subscription' };
  }
};

interface EmailTemplateValues {
  // Branding
  EmailTitle: string;
  HeaderImage: string;

  // Content
  WelcomeHeader: string;
  LoginButtonText: string;
  LoginButtonUrl: string;

  // Signature
  SignatureText: string;
  SignatureCompany: string;

  // Colors
  EmailBackgroundColor: string;
  HeaderBackgroundColor: string;
  ContentBackgroundColor: string;
  MainBackgroundColor: string;
  TableHeaderBackgroundColor: string;
  MainTextColor: string;
  HeaderTextColor: string;
  HighlightTextColor: string;
  FooterTextColor: string;

  // Typography
  FontFamily: string;

  // New content text properties
  greeting: string;
  thankYouMessage: string;
  cityMessage: string;
  mainMessage: string;
  followUpMessage: string;
  inviteMessage: string;
  websiteUrl: string;
  closingMessage: string;
  footerSignature: string;

  footerURL: String;
}

// eslint-disable-next-line max-lines-per-function
function generateHtmlString(values: EmailTemplateValues): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: ${values.FontFamily};
          line-height: 1.7;
          color: ${values.MainTextColor};
          margin: 0;
          padding: 0;
          background-color: ${values.EmailBackgroundColor};
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: ${values.HeaderBackgroundColor};
          padding: 20px;
          text-align: center;
        }
        .header img {
          width: 50px;
        }
        .header h1 {
          color: ${values.HeaderTextColor};
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          background-color: ${values.ContentBackgroundColor};
          padding: 20px;
        }
        .welcome-header {
          text-align: center;
          font-size: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th {
          background-color: ${values.TableHeaderBackgroundColor};
          padding: 10px;
          text-align: left;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .action-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: ${values.MainBackgroundColor};
          color: ${values.HighlightTextColor} !important;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .action-button:visited,
        .action-button:hover,
        .action-button:active {
          color: ${values.HighlightTextColor} !important;
          text-decoration: none;
        }
        .footer {
          background-color: ${values.MainBackgroundColor};
          background-image: url('${values.footerURL}'); /* Add your image URL here */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: ${values.FooterTextColor};
          padding: 20px;
          text-align: center;
        }
        .content p {
          margin-bottom: 16px;
        }
        .highlight {
          font-weight: bold;
          color: ${values.MainTextColor};
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${values.EmailTitle}</h1>
        </div>
        <div class="content">
          <p>${values.greeting}</p>
          
          <p>${values.thankYouMessage}</p>
          
          <p>${values.cityMessage}</p>
          
          <p>${values.mainMessage}</p>
          
          <p>${values.followUpMessage}</p>
          
          <p>${values.inviteMessage} <a href="${values.websiteUrl}">${values.websiteUrl}</a></p>
          
          <p>${values.closingMessage}</p>
        </div>
        <div class="footer">
          <p>${values.footerSignature}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function getEmailImageUrl(imageKey: string) {
  const fullKey = imageKey.startsWith('email-images/')
    ? imageKey
    : `email-images/${imageKey}`;

  const command = new GetObjectCommand({
    Bucket: env.MAPYOURHEALTH_IMAGES_BUCKET_NAME,
    Key: fullKey,
  });

  const url = await getSignedUrl(s3Client as any, command, { expiresIn: 3600 });
  console.log(url, 'url');
  return url;
}
