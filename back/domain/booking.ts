export interface BookingRow {
    id: number;
    date: string;
    user_id: number;
    room_id: number;
}

export interface Booking {
    id: number;
    date: string;
    userId: number;
    roomId: number;
}

export const toBooking = (row: BookingRow): Booking => {
    return {
        id: row["id"],
        date: row["date"],
        userId: row["user_id"],
        roomId: row["room_id"],
    }
}