/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($email: AWSEmail!) {
  getUser(email: $email) {
    createdAt
    email
    name
    source
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $email: AWSEmail
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUsers(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      createdAt
      email
      name
      source
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const signUpNewsletter = /* GraphQL */ `query SignUpNewsletter(
  $callbackURL: String
  $country: String
  $email: String!
  $zip: String
) {
  signUpNewsletter(
    callbackURL: $callbackURL
    country: $country
    email: $email
    zip: $zip
  ) {
    success
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SignUpNewsletterQueryVariables,
  APITypes.SignUpNewsletterQuery
>;
