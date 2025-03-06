import { defineFunction, secret } from '@aws-amplify/backend';

export const signUpNewsletter = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'signUp-newsletter',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  environment: {
    SENDGRID_API_KEY: secret('SENDGRID_API_KEY'),
    SENDGRID_FROM_EMAIL:
      process.env.SENDGRID_FROM_EMAIL ?? 'walter.vargaspena+1@gmail.com',
  },
});
