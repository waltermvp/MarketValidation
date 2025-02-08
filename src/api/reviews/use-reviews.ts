import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Review } from './types';

type Response = Review[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useReviews = createQuery<Response, Variables>({
  queryKey: ['reviews'],
  fetcher: () => {
    const result = client.models.Review.list({})
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching displays:', error);
        throw error; // Rethrow the error to be handled by react-query
      })
      .then((response) => {
        if (!response) {
          throw new Error('Failed to fetch reviews');
        }
        return response as Response;
      });
    console.log('result', result);
    return result;
  },
});
