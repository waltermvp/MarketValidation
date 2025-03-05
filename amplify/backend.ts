import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { signUpNewsletter } from './functions/signUp-newsletter/resource';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CfnApp } from 'aws-cdk-lib/aws-pinpoint';
import { Stack } from 'aws-cdk-lib/core';
import { storage } from './storage/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({ signUpNewsletter, auth, data, storage });
const analyticsStack = backend.createStack('analytics-stack');

const statement = new iam.PolicyStatement({
  sid: 'AllowNewsletterToSendEmail',
  actions: ['ses:SendEmail', 'ses:SendRawEmail'],
  resources: [
    // `arn:aws:ses:${process.env.AWS_REGION}:${process.env.AWS_ACCOUNT_ID}:identity/*`,
    '*',
  ],
});

// create a Pinpoint app
const pinpoint = new CfnApp(analyticsStack, 'Pinpoint', {
  name: 'marketValidationPinpointApp',
});

// create an IAM policy to allow interacting with Pinpoint
const pinpointPolicy = new Policy(analyticsStack, 'PinpointPolicy', {
  policyName: 'PinpointPolicy',
  statements: [
    new PolicyStatement({
      actions: ['mobiletargeting:UpdateEndpoint', 'mobiletargeting:PutEvents'],
      resources: [pinpoint.attrArn + '/*'],
    }),
  ],
});

// apply the policy to the authenticated and unauthenticated roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  pinpointPolicy
);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
  pinpointPolicy
);
backend.signUpNewsletter.resources.lambda.addToRolePolicy(statement);

// patch the custom Pinpoint resource to the expected output configuration
backend.addOutput({
  analytics: {
    amazon_pinpoint: {
      app_id: pinpoint.ref,
      aws_region: Stack.of(pinpoint).region,
    },
  },
});
