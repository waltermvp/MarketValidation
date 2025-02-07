import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Review } from './types';

type Variables = { name: string; rating: number; comment: string };
type Response = Review;

export const useAddReview = createMutation<Response, Variables, AxiosError>({
  mutationFn: (variables) => {
    return client.models.Review.create({
      name: variables.name,
      rating: variables.rating,
      comment: variables.comment,
    }).then((response) => {
      console.log('response', response);
      if (!response.data || response.data.rating === null) {
        throw new Error('Failed to create review');
      }
      return response.data as Response;
    });
  },
});
