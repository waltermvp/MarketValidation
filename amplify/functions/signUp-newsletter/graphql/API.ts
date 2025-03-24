/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  confirmationCode?: string | null,
  confirmed?: boolean | null,
  country?: string | null,
  createdAt?: string | null,
  email: string,
  name?: string | null,
  source?: string | null,
  updatedAt: string,
  zip?: string | null,
};

export type ModelStringKeyConditionInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  confirmationCode?: ModelStringInput | null,
  confirmed?: ModelBooleanInput | null,
  country?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  source?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  zip?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type SignUpNewsletterReturnType = {
  __typename: "SignUpNewsletterReturnType",
  message?: string | null,
  success: boolean,
};

export type ConfirmNewsletterReturnType = {
  __typename: "ConfirmNewsletterReturnType",
  message?: string | null,
  success: boolean,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  confirmationCode?: ModelStringInput | null,
  confirmed?: ModelBooleanInput | null,
  country?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  source?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  zip?: ModelStringInput | null,
};

export type CreateUserInput = {
  confirmationCode?: string | null,
  confirmed?: boolean | null,
  country?: string | null,
  createdAt?: string | null,
  email: string,
  name?: string | null,
  source?: string | null,
  zip?: string | null,
};

export type DeleteUserInput = {
  email: string,
};

export type UpdateUserInput = {
  confirmationCode?: string | null,
  confirmed?: boolean | null,
  country?: string | null,
  createdAt?: string | null,
  email: string,
  name?: string | null,
  source?: string | null,
  zip?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  confirmationCode?: ModelSubscriptionStringInput | null,
  confirmed?: ModelSubscriptionBooleanInput | null,
  country?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  source?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  zip?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type GetUserQueryVariables = {
  email: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type ListUserByConfirmationCodeAndCreatedAtQueryVariables = {
  confirmationCode: string,
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserByConfirmationCodeAndCreatedAtQuery = {
  listUserByConfirmationCodeAndCreatedAt?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      confirmationCode?: string | null,
      confirmed?: boolean | null,
      country?: string | null,
      createdAt?: string | null,
      email: string,
      name?: string | null,
      source?: string | null,
      updatedAt: string,
      zip?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserBySourceAndCreatedAtQueryVariables = {
  createdAt?: ModelStringKeyConditionInput | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  source: string,
};

export type ListUserBySourceAndCreatedAtQuery = {
  listUserBySourceAndCreatedAt?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      confirmationCode?: string | null,
      confirmed?: boolean | null,
      country?: string | null,
      createdAt?: string | null,
      email: string,
      name?: string | null,
      source?: string | null,
      updatedAt: string,
      zip?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  email?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      confirmationCode?: string | null,
      confirmed?: boolean | null,
      country?: string | null,
      createdAt?: string | null,
      email: string,
      name?: string | null,
      source?: string | null,
      updatedAt: string,
      zip?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SignUpNewsletterQueryVariables = {
  callbackURL?: string | null,
  country?: string | null,
  email: string,
  lang?: string | null,
  zip?: string | null,
};

export type SignUpNewsletterQuery = {
  signUpNewsletter?:  {
    __typename: "SignUpNewsletterReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type ConfirmNewsletterMutationVariables = {
  confirmationCode: string,
};

export type ConfirmNewsletterMutation = {
  confirmNewsletter?:  {
    __typename: "ConfirmNewsletterReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    confirmationCode?: string | null,
    confirmed?: boolean | null,
    country?: string | null,
    createdAt?: string | null,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};
