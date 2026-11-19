export interface GetHotelsResponse {
    data: HotelRow[],
    total: number,
    page: number,
    size: number,
    totalPages: number
}

export interface HotelRow {
    id: number;
    name: string;
    stars: number;
    preview: string;
    pictureId: string;
    price: Price | null;
    stats: HotelStats;
}

interface Price {
    defaultPrice: number;
    discountPrice: number;
    isCurrentSale: boolean;
    discountPercent: number;
}

interface HotelStats {
    averageScore: number | null;
    reviewCount: number;
}