/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Review = {
  __typename: "Review",
  comment: string,
  createdAt: string,
  id: string,
  name: string,
  rating: number,
  updatedAt: string,
};

export type User = {
  __typename: "User",
  country?: string | null,
  createdAt: string,
  email: string,
  name?: string | null,
  source?: string | null,
  updatedAt: string,
  zip?: string | null,
};

export type ModelReviewFilterInput = {
  and?: Array< ModelReviewFilterInput | null > | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelReviewFilterInput | null,
  or?: Array< ModelReviewFilterInput | null > | null,
  rating?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
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

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelReviewConnection = {
  __typename: "ModelReviewConnection",
  items:  Array<Review | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
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

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type RequestQuoteReturnType = {
  __typename: "RequestQuoteReturnType",
  message?: string | null,
  success: boolean,
};

export type SignUpNewsletterReturnType = {
  __typename: "SignUpNewsletterReturnType",
  message?: string | null,
  success: boolean,
};

export type ModelReviewConditionInput = {
  and?: Array< ModelReviewConditionInput | null > | null,
  comment?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelReviewConditionInput | null,
  or?: Array< ModelReviewConditionInput | null > | null,
  rating?: ModelIntInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateReviewInput = {
  comment: string,
  id?: string | null,
  name: string,
  rating: number,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
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
  country?: string | null,
  email: string,
  name?: string | null,
  source?: string | null,
  zip?: string | null,
};

export type DeleteReviewInput = {
  id: string,
};

export type DeleteUserInput = {
  email: string,
};

export type UpdateReviewInput = {
  comment?: string | null,
  id: string,
  name?: string | null,
  rating?: number | null,
};

export type UpdateUserInput = {
  country?: string | null,
  email: string,
  name?: string | null,
  source?: string | null,
  zip?: string | null,
};

export type ModelSubscriptionReviewFilterInput = {
  and?: Array< ModelSubscriptionReviewFilterInput | null > | null,
  comment?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionReviewFilterInput | null > | null,
  rating?: ModelSubscriptionIntInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
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

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
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

export type GetReviewQueryVariables = {
  id: string,
};

export type GetReviewQuery = {
  getReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  email: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type ListReviewsQueryVariables = {
  filter?: ModelReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReviewsQuery = {
  listReviews?:  {
    __typename: "ModelReviewConnection",
    items:  Array< {
      __typename: "Review",
      comment: string,
      createdAt: string,
      id: string,
      name: string,
      rating: number,
      updatedAt: string,
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
      country?: string | null,
      createdAt: string,
      email: string,
      name?: string | null,
      source?: string | null,
      updatedAt: string,
      zip?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type RequestQuoteQueryVariables = {
  content?: string | null,
  email: string,
  name?: string | null,
};

export type RequestQuoteQuery = {
  requestQuote?:  {
    __typename: "RequestQuoteReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type SignUpNewsletterQueryVariables = {
  callbackURL?: string | null,
  country?: string | null,
  email: string,
  zip?: string | null,
};

export type SignUpNewsletterQuery = {
  signUpNewsletter?:  {
    __typename: "SignUpNewsletterReturnType",
    message?: string | null,
    success: boolean,
  } | null,
};

export type CreateReviewMutationVariables = {
  condition?: ModelReviewConditionInput | null,
  input: CreateReviewInput,
};

export type CreateReviewMutation = {
  createReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type DeleteReviewMutationVariables = {
  condition?: ModelReviewConditionInput | null,
  input: DeleteReviewInput,
};

export type DeleteReviewMutation = {
  deleteReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type UpdateReviewMutationVariables = {
  condition?: ModelReviewConditionInput | null,
  input: UpdateReviewInput,
};

export type UpdateReviewMutation = {
  updateReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnCreateReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
};

export type OnCreateReviewSubscription = {
  onCreateReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnDeleteReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
};

export type OnDeleteReviewSubscription = {
  onDeleteReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};

export type OnUpdateReviewSubscriptionVariables = {
  filter?: ModelSubscriptionReviewFilterInput | null,
};

export type OnUpdateReviewSubscription = {
  onUpdateReview?:  {
    __typename: "Review",
    comment: string,
    createdAt: string,
    id: string,
    name: string,
    rating: number,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    country?: string | null,
    createdAt: string,
    email: string,
    name?: string | null,
    source?: string | null,
    updatedAt: string,
    zip?: string | null,
  } | null,
};
