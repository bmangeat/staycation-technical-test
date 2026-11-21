import DB from '@/db';
import type { BestPriceOpening, BestPriceOpeningRow } from '@/domain/opening';

export class OpeningRepository {
  async findLowestOpeningByHotelIds(ids: number[]): Promise<Map<number, BestPriceOpening>> {
    if (ids.length === 0) {
      return new Map();
    }
    const data = await DB.query<BestPriceOpeningRow>(
      `
            WITH opening_stock as (
                SELECT 
                    count(b.id) as booking_number, 
                    o.stock - count(b.id) as remaining,
                    o.id as opening_id
                from openings o
                left join bookings b on o.room_id = b.room_id and b.date = o.date
                join rooms r on o.room_id = r.id
                where r.hotel_id = ANY($1::int[])
                group by o.id
            )
            SELECT 
                distinct on (r.hotel_id) r.hotel_id, 
                o.price, 
                o.discount_price,
                o.sale_id
            from openings o
            inner join rooms r on r.id = o.room_id
            JOIN opening_stock os ON os.opening_id = o.id
            JOIN sale_dates sd on sd.id = o.sale_id
            where 
                r.hotel_id = ANY($1::int[]) 
                and os.remaining > 0
            order by 
                r.hotel_id,  
                sd.end_date desc, 
                o.discount_price asc, 
                o.price desc
            `,
      [ids],
    );
    const rows = data.rows;
    return new Map<number, BestPriceOpening>(
      rows.map((r) => [
        r.hotel_id,
        {
          price: r.price,
          saleId: r.sale_id,
          discountPrice: r.discount_price,
        },
      ]),
    );
  }
}
