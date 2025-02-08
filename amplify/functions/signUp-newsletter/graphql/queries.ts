/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getReview = /* GraphQL */ `query GetReview($id: ID!) {
  getReview(id: $id) {
    comment
    createdAt
    id
    name
    rating
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetReviewQueryVariables, APITypes.GetReviewQuery>;
export const getUser = /* GraphQL */ `query GetUser($email: AWSEmail!) {
  getUser(email: $email) {
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
export const listReviews = /* GraphQL */ `query ListReviews(
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      comment
      createdAt
      id
      name
      rating
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReviewsQueryVariables,
  APITypes.ListReviewsQuery
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
export const requestQuote = /* GraphQL */ `query RequestQuote($content: String, $email: String!, $name: String) {
  requestQuote(content: $content, email: $email, name: $name) {
    message
    success
    __typename
  }
}
` as GeneratedQuery<
  APITypes.RequestQuoteQueryVariables,
  APITypes.RequestQuoteQuery
>;
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
    message
    success
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SignUpNewsletterQueryVariables,
  APITypes.SignUpNewsletterQuery
>;
