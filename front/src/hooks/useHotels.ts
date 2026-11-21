import { useQuery } from 'react-query';
import { apiFetch } from 'lib/api';
import { GetHotelsResponse } from 'types/hotel';
import { Pagination } from 'types/pagination';

async function fetchHotels({ page, size }: Pagination): Promise<GetHotelsResponse> {
  return apiFetch(`/hotels?page=${page}&size=${size}`);
}

export function useHotels({ page = 1, size = 20 }: Pagination) {
  return useQuery(['hotels', { page, size }], () => fetchHotels({ page, size }), {
    keepPreviousData: true,
    staleTime: 60 * 1000,
    select: (res) => ({
      hotels: res.data,
      total: res.total,
      totalPages: res.totalPages,
    }),
  });
}
