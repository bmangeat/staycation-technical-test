import HotelCard from 'components/HotelCard'
import { useHotels } from 'hooks/useHotels'
import React, { useEffect, useState } from 'react'


const HotelPage = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, isFetching, error } = useHotels({ page })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])

    if (isLoading) return <>Loading</>
    if (isError || !data) return <>{error}</>
    return (
        <main className="container">
            <section className="grid">
                {data.hotels.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </section>
            <nav className="pagination">
                <button
                    className="pagination__button"
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage(p => p - 1)}>
                    Précédent
                </button>
                <span className="pagination__info">
                    Page {page} / {data.totalPages}
                </span>
                <button
                    className="pagination__button"
                    disabled={page >= data.totalPages || isFetching}
                    onClick={() => setPage(p => p + 1)}>
                    Suivant
                </button>
            </nav>
        </main>
    )
}

export default HotelPage
