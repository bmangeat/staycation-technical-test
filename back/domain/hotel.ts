export interface DbHotelRow {
  id: number;
  name: string;
  stars: number;
  preview: string;
  picture_id: string;
}

export interface HotelWithStatsRow extends DbHotelRow {
  average_score: number | null;
  review_count: number;
}

export interface Hotel {
  id: number;
  name: string;
  stars: number;
  preview: string;
  pictureId: string;
}

export interface HotelWithStats extends Hotel {
  stats?: HotelStats;
}

export interface HotelStats {
  averageScore: number;
  reviewCount: number;
}

export const toHotel = (row: DbHotelRow): Hotel => {
  return {
    id: row.id,
    name: row.name,
    stars: row.stars,
    preview: row.preview,
    pictureId: row.picture_id,
  };
};

export const toHotelWithStats = (row: HotelWithStatsRow): HotelWithStats => {
  if (!row.review_count || row.review_count === 0) {
    return toHotel(row);
  }
  if (row.average_score === null) {
    throw new Error(`Has reviews but null average_score is null. Should not happen.`);
  }
  return {
    ...toHotel(row),
    stats: {
      averageScore: row.average_score,
      reviewCount: row.review_count,
    },
  };
};
