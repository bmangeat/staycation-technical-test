import { toBooking, type Booking, type BookingRow } from "@/domain/booking";
import DB from '../db'
import type { Pagination } from "@/domain/pagination";

export class BookingRepository {
    async findOne(bookingId: number): Promise<Booking | undefined> {
        const data = await DB.query<BookingRow>(
            "SELECT * FROM bookings WHERE id=$1::int",
            [bookingId]
        )
        const row = data.rows[0];
        return !row ? undefined : toBooking(row);
    }
    async findAll(options?: Pagination): Promise<{ rows: Booking[], count: number }> {
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 20;
        const [data, total] = await Promise.all([
            DB.query<BookingRow>(
                "SELECT * FROM bookings ORDER BY id ASC LIMIT $1 OFFSET $2",
                [limit, offset]
            ),
            DB.query(
                "SELECT COUNT (*) from hotels"
            )
        ])
        const rows: BookingRow[] = data.rows;
        return {
            rows: rows.length > 0 ? rows.map(r => toBooking(r)) : [],
            count: Number(total.rows[0].count) ?? 0
        }
    }
}