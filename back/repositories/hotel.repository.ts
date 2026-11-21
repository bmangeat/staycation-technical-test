import { toHotelWithStats, type HotelWithStats, type HotelWithStatsRow } from '@/domain/hotel';
import DB from '@/db';
import type { Pagination } from '@/domain/pagination';

export class HotelsRepository {
  async findAllWithStats(options?: Pagination): Promise<{ rows: HotelWithStats[]; count: number }> {
    const offset = options?.offset ?? 0;
    const limit = options?.limit ?? 20;
    const [data, total] = await Promise.all([
      DB.query<HotelWithStatsRow>(
        `
                SELECT 
                    h.*, 
                    COUNT(r.id)::int as review_count,
                    ROUND(AVG(r.score::numeric), 1)::float as average_score
                FROM hotels h
                left join reviews r on r.hotel_id = h.id
                group by h.id
                order by h.id ASC 
                LIMIT $1 OFFSET $2`,
        [limit, offset],
      ),
      DB.query<{ count: number }>('SELECT COUNT(id)::int FROM hotels'),
    ]);
    return {
      rows: data.rows.map((r) => toHotelWithStats(r)),
      count: total.rows[0]?.count ?? 0,
    };
  }
}
