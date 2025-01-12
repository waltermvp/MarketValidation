import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { signUpNewsletter } from './functions/signUp-newsletter/resource';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({  signUpNewsletter,
  auth,
  data,
});



const statement = new iam.PolicyStatement({
  sid: 'AllowNewsletterToSendEmail',
  actions: ['ses:SendEmail', 'ses:SendRawEmail'],
  resources: [
    // `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:identity/*`,
    '*',
  ],
});


backend.signUpNewsletter.resources.lambda.addToRolePolicy(statement);