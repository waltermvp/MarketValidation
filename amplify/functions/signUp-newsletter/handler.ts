import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import { randomBytes } from 'crypto';

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
  const { email, callbackURL, country, zip } = event.arguments;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email format' };
  }

  try {
    // Create user in database
    const newsletterToken = randomBytes(32).toString('hex');

    await dataClient.graphql({
      query: createUser,
      variables: {
        input: {
          // newsletterToken: newsletterToken,
          name: 'My first todo',
          email: email,
          country: country ? country : undefined,
          zip: zip ? zip : undefined,
          // newsletterConfirmed: false,
          // newsletterSubscribed: true,
        },
      },
    });

    const host = callbackURL === 'localhost:8081' ? 'http://' : 'https://';
    // Send welcome email
    const templateValues = {
      EmailTitle: 'Welcome to AlfajoresNY - Confirm Your Subscription',
      HeaderImage:
        // 'https://dta56yysqj9ke.cloudfront.net/eyJidWNrZXQiOiJhbXBsaWZ5LWRxZmluYjB3cXFpczMtbWFpLWFsZmFqb3Jlc2RyaXZlYnVja2V0ZTNjNy03bjF6a3R0NWY5cmMiLCJrZXkiOiJJTUdfMDEzOS5KUEcifQ==',
        'https://dta56yysqj9ke.cloudfront.net/eyJidWNrZXQiOiJhbXBsaWZ5LWRxZmluYjB3cXFpczMtbWFpLWFsZmFqb3Jlc2RyaXZlYnVja2V0ZTNjNy03bjF6a3R0NWY5cmMiLCJrZXkiOiJhbGZhMS5qcGVnIn0=',
      // HeaderImageAlt: 'AlfajoresNY Welcome Header',
      WelcomeHeader: 'Thanks for signing up!',
      // FirstName: 'John',
      // CompanyName: 'AlfajoresNY',
      MainMessage:
        "We're really excited you've decided to give us a try. Please confirm your subscription by clicking the button below. In case you have any questions, feel free to reach out to us at contact@alfajoresny.com. You can login to your account with your username " +
        email,
      LoginButtonText: 'Confirm Subscription',
      LoginButtonUrl: `${host}${callbackURL}/user/${newsletterToken}`,
      SignatureText: 'Thanks,',
      SignatureCompany: 'The AlfajoresNY Team',

      // Colors
      MainTextColor: '#7D2020',
      EmailBackgroundColor: '#7D2020',
      HeaderBackgroundColor: '#ffffff',
      ContentBackgroundColor: '#ffffff',
      MainBackgroundColor: '#7D2020',
      TableHeaderBackgroundColor: '#f8f9fa',
      HeaderTextColor: '#000000',
      HighlightTextColor: '#ffffff',
      FooterTextColor: '#ffffff',

      // Typography
      FontFamily: 'Arial, sans-serif',
      LineItems: '',
      OrderTotal: '',
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
          Data: 'Welcome to AlfajoresNY Newsletter',
        },
      },
      Source: emailFrom,
    });

    await ses.send(sendEmailCommand);
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Failed to process subscription' };
  }
};

interface EmailTemplateValues {
  // Branding
  EmailTitle: string;
  HeaderImage: string;

  // Content
  WelcomeHeader: string;
  MainMessage: string;
  LineItems: string;
  OrderTotal: string;
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
          color: ${values.FooterTextColor};
          padding: 20px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${values.HeaderImage}" alt="${values.EmailTitle}">
          <h1>${values.EmailTitle}</h1>
        </div>
        <div class="content">
          <h2 class="welcome-header">${values.WelcomeHeader}</h2>
          <p>${values.MainMessage}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>${values.LineItems}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="text-align: right; font-weight: bold;">Total:</td>
                <td>${values.OrderTotal}</td>
              </tr>
            </tfoot>
          </table>
          <a class="action-button" href="${values.LoginButtonUrl}">${values.LoginButtonText}</a>
          <p>${values.LoginButtonUrl}</p>
        </div>
        <div class="footer">
          <p>${values.SignatureText}<br>${values.SignatureCompany}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
