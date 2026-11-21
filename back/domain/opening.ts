export interface BestPriceOpeningRow {
  hotel_id: number;
  sale_id: number;
  price: number;
  discount_price: number;
}

export interface BestPriceOpening {
  saleId: number;
  price: number;
  discountPrice: number;
}

export const toBestPriceOpening = (row: BestPriceOpeningRow): BestPriceOpening => {
  return {
    saleId: row.sale_id,
    price: row.price,
    discountPrice: row.discount_price,
  };
};
