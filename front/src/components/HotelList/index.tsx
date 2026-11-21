import HotelCard from 'components/HotelCard';
import HotelCardSkeleton from 'components/HotelCard/HotelSkeletonCard';
import { useHotels } from 'hooks/useHotels';
import React, { useEffect, useState } from 'react';

const HotelList = () => {
  const SKELETON_COUNT = 4;
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useHotels({ page });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (isLoading) {
    return (
      <main className="container">
        <section className="grid">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <HotelCardSkeleton key={index} />
          ))}
        </section>
      </main>
    );
  }
  if (isError || !data) {
    return (
      <main className="container text-center">
        Oops, an error occured. Please, wait and get a coffee. ☕️
      </main>
    );
  }

  return (
    <main className="container">
      <section className="grid">
        {data.hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </section>
      {data.totalPages > 1 && (
        <nav className="pagination">
          <button
            className="pagination__button"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((p) => p - 1)}
          >
            Précédent
          </button>
          <span className="pagination__info">
            Page {page} / {data.totalPages}
          </span>
          <button
            className="pagination__button"
            disabled={page >= data.totalPages || isFetching}
            onClick={() => setPage((p) => p + 1)}
          >
            Suivant
          </button>
        </nav>
      )}
    </main>
  );
};

export default HotelList;
