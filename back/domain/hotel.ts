export interface HotelRow {
    id: number;
    name: string;
    stars: number;
    preview: string;
    picture_id: string;
}

export interface Hotel {
    id: number;
    name: string;
    stars: number;
    preview: string;
    pictureId: string;
}

export const toHotel = (row: HotelRow): Hotel => {
    const { id, name, stars, preview } = row;
    return {
        id: row["id"],
        name: row["name"],
        stars: row["stars"],
        preview: row["preview"],
        pictureId: row["picture_id"]
    }
}