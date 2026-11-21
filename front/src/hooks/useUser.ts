import { useQuery } from 'react-query';
import { apiFetch } from 'lib/api';
import { GetUserResponse } from 'types/user';

const USER_ID = process.env.REACT_APP_USER_ID || 1;

async function fetchUser(): Promise<GetUserResponse> {
  return apiFetch(`/users/${USER_ID}`);
}

export function useUser() {
  return useQuery(['users'], () => fetchUser(), {
    staleTime: 60 * 1000,
  });
}
