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
    confirmationCode
    confirmed
    country
    createdAt
    email
    name
    source
    updatedAt
    zip
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUserByConfirmationCodeAndCreatedAt = /* GraphQL */ `query ListUserByConfirmationCodeAndCreatedAt(
  $confirmationCode: String!
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserByConfirmationCodeAndCreatedAt(
    confirmationCode: $confirmationCode
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      confirmationCode
      confirmed
      country
      createdAt
      email
      name
      source
      updatedAt
      zip
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserByConfirmationCodeAndCreatedAtQueryVariables,
  APITypes.ListUserByConfirmationCodeAndCreatedAtQuery
>;
export const listUserBySourceAndCreatedAt = /* GraphQL */ `query ListUserBySourceAndCreatedAt(
  $createdAt: ModelStringKeyConditionInput
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $source: String!
) {
  listUserBySourceAndCreatedAt(
    createdAt: $createdAt
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    source: $source
  ) {
    items {
      confirmationCode
      confirmed
      country
      createdAt
      email
      name
      source
      updatedAt
      zip
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserBySourceAndCreatedAtQueryVariables,
  APITypes.ListUserBySourceAndCreatedAtQuery
>;
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
      confirmationCode
      confirmed
      country
      createdAt
      email
      name
      source
      updatedAt
      zip
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
  $lang: String
  $zip: String
) {
  signUpNewsletter(
    callbackURL: $callbackURL
    country: $country
    email: $email
    lang: $lang
    zip: $zip
  ) {
    message
    success
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SignUpNewsletterQueryVariables,
  APITypes.SignUpNewsletterQuery
>;
