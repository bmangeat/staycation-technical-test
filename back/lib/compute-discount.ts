export function computePercentDiscount(price: number, discountPrice: number): number {
  if (price <= 0 || discountPrice >= price) return 0;
  return Math.round((1 - discountPrice / price) * 100);
}
