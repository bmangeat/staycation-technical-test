import HotelCard from 'components/HotelCard'
import { useHotels } from 'hooks/useHotels'
import React, { useState } from 'react'


const HotelList = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading, isError, error } = useHotels({ page })

    if (isLoading) return <>Loading</>
    if (isError || !data) return <p>ERROR</p>
    console.log(data.data);
    return (
        <>
            <div className="wall">
                {data?.data?.map(hotel => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Précédent</button>
            <button disabled={page >= data.total} onClick={() => setPage(p => p + 1)}>Suivant</button>
        </>
    )
}

export default HotelList
