import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { User } from './types';

type Response = User[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const useUsers = createQuery<Response, Variables>({
  queryKey: ['users'],
  fetcher: () => {
    const result = client.models.User.list({ authMode: 'userPool' })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error fetching displays:', error);
        throw error; // Rethrow the error to be handled by react-query
      });
    console.log('result', result);
    return result;
  },
});
