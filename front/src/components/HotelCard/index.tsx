import React from 'react';
import type { HotelRow } from 'types/hotel';

import 'styles/card.scss';

interface Props {
  hotel: HotelRow;
}

const HotelCard = ({ hotel }: Props) => {
  const isUnavailable = !hotel.price;
  return (
    <article className={isUnavailable ? 'card card--unavailable' : 'card'}>
      <div className="card__wrapper-image">
        <img
          alt={'Photo illustrant : ' + hotel.name}
          className="card__background-image"
          src={hotel.pictureId}
        />
      </div>
      <div className="card__header">
        <h3 className="card__title">
          {hotel.name} <span>{'*'.repeat(hotel.stars)}</span>
        </h3>
        <span className="ratings">
          {hotel.stats ? `${hotel.stats.averageScore} (${hotel.stats.reviewCount})` : 'Aucun avis'}
        </span>
      </div>
      <div className="card__body">
        <p className="card__subtitle">{hotel.preview}</p>
        {hotel.price ? (
          <div className="prices">
            <strong>{hotel.price.discountPrice}€</strong>
            <del className="price-old">{hotel.price.defaultPrice}€</del>
            <strong className="discount-badge">-{hotel.price.discountPercent}%</strong>
            {!hotel.price.isCurrentSale && (
              <span className="price-stale-label">Prix indicatif</span>
            )}
          </div>
        ) : (
          <p className="prices--none">Pas de disponibilité</p>
        )}
      </div>
    </article>
  );
};

export default HotelCard;
