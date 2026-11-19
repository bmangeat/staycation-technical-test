import DB from '@/db'

export class SaleDatesRepository {
    async findMostRecentSaleDatesId(): Promise<number | undefined> {
        const result = await DB.query<{id: number}>(
            "SELECT id FROM sale_dates sd order by sd.end_date desc limit 1",
        )
        const row = result.rows[0];
        return !row ? undefined : row.id;
    }
}
