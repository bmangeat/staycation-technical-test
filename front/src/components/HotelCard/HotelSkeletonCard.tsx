import React from 'react';
import 'styles/card.scss';

const HotelCardSkeleton = () => (
  <article className="card card--skeleton" aria-hidden="true">
    <div className="card__wrapper-image">
      <div className="skeleton__block skeleton__block--image" />
    </div>
    <div className="card__header">
      <span className="skeleton__block skeleton__block--title" />
      <span className="skeleton__block skeleton__block--rating" />
    </div>
    <div className="card__body">
      <span className="skeleton__block skeleton__block--subtitle" />
      <div className="prices">
        <span className="skeleton__block skeleton__block--price" />
        <span className="skeleton__block skeleton__block--old-price" />
        <span className="skeleton__block skeleton__block--badge" />
      </div>
    </div>
  </article>
);

export default HotelCardSkeleton;
