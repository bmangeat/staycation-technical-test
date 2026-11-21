import { useQuery } from 'react-query';
import { GetUserResponse } from 'types/user';

const API_URL = process.env.API_URL || 'http://localhost:9000';

async function fetchUser(): Promise<GetUserResponse> {
  const res = await fetch(`${API_URL}/users/1`);
  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }
  return res.json();
}

export function useUser() {
  return useQuery(['users'], () => fetchUser(), {
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });
}
