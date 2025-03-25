/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const confirmNewsletter = /* GraphQL */ `mutation ConfirmNewsletter($confirmationCode: String!) {
  confirmNewsletter(confirmationCode: $confirmationCode) {
    message
    success
    __typename
  }
}
` as GeneratedMutation<
  APITypes.ConfirmNewsletterMutationVariables,
  APITypes.ConfirmNewsletterMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
