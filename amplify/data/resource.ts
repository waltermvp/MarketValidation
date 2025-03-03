import { a, type ClientSchema, defineData } from '@aws-amplify/backend';

import { signUpNewsletter } from '../functions/signUp-newsletter/resource';

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/
const schema = a
  .schema({
    User: a
      .model({
        email: a.email().required(),
        name: a.string(),
        source: a.string().default('landingPage'),
        country: a.string(),
        zip: a.string(),
        createdAt: a.datetime(),
      })
      .secondaryIndexes((index) => [index('source').sortKeys(['createdAt'])])
      .identifier(['email'])
      .authorization((allow) => [
        allow.guest().to(['create']),
        allow.authenticated().to(['read']),
      ]),

    signUpNewsletter: a
      .query()
      .arguments({
        email: a.string().required(),
        country: a.string(),
        zip: a.string(),
        callbackURL: a.string(),
      })
      .returns(
        a.customType({ success: a.boolean().required(), message: a.string() })
      )
      .handler(a.handler.function(signUpNewsletter))
      .authorization((allow) => [allow.guest()]),
  })
  .authorization((allow) => [
    allow.resource(signUpNewsletter).to(['query', 'listen', 'mutate']),
  ]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
