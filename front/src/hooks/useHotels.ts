import { useQuery } from "react-query";
import { GetHotelsResponse } from "types/hotel";
import { Pagination } from "types/pagination";

const API_URL = process.env.API_URL || 'http://localhost:9000';

async function fetchHotels({ page, size }: Pagination): Promise<GetHotelsResponse> {
    const res = await fetch(`${API_URL}/hotels?page=${page}&size=${size}`);
    if (!res.ok) {
        throw new Error("Failed to fetch hotels")
    }
    return res.json(); 
}

export function useHotels({ page = 1, size = 20 }: Pagination) {
    return useQuery(
        ['hotels', {page, size}],
        () => fetchHotels({page, size}),
        {
            keepPreviousData: true,
            staleTime: 60 * 1000,
            select: (res) => ({
                hotels: res.data,
                total: res.total,
                totalPages: res.totalPages,
            })
        },
    )
}