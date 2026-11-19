import { useHotels } from 'hooks/useHotels'
import React, { useState } from 'react'
import { GetHotelsResponse, HotelRow } from 'types/hotel'

type Props = {
    hotel: HotelRow
}

const HotelCard = ({ hotel }: Props) => {
  return (
     <>
      <div className="card">
        <h3>{hotel.name}</h3>
      </div>
    </>
  )
}

export default HotelCard
