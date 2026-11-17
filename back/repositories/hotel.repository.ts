import { toHotel, type Hotel, type HotelRow } from "@/domain/hotel";
import DB from '../db'
import type { Pagination } from "@/domain/pagination";

export class HotelsRepository {
    async findOne(hotelId: number): Promise<Hotel | undefined> {
        const data = await DB.query<HotelRow>(
            "SELECT * FROM hotels WHERE id=$1::int",
            [hotelId]
        )
        const row = data.rows[0];
        return !row ? undefined : toHotel(row);
    }

    async findAll(options?: Pagination): Promise<{ rows: Hotel[], count: number }> {
        const offset = options?.offset ?? 0;
        const limit = options?.limit ?? 20;
        // Potential improvements : ordering
        const [data, total] = await Promise.all([
            DB.query<HotelRow>(
                "SELECT * FROM hotels ORDER BY id ASC LIMIT $1 OFFSET $2",
                [limit, offset]
            ),
            DB.query(
                "SELECT COUNT (*) from hotels"
            )
        ])
        const rows: HotelRow[] = data.rows;
        return {
            rows: rows.length > 0 ? rows.map(r => toHotel(r)) : [],
            count: Number(total.rows[0].count) ?? 0
        }
    }
}
