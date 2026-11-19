import type { HotelStats } from "@/domain/hotel";

export interface GetHotelsDto {
    rows: HotelRow[];
    count: number;
}

interface HotelRow {
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
