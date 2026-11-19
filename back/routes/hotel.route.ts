import type { Pagination } from '@/domain/pagination';
import { paginationParamsSchema } from '@/schemas/pagination.schema';
import type { HotelService } from '@/services/hotel.service';
import { Router } from 'express';

export const createHotelRouter = (hotelService: HotelService): Router => {
    const router = Router();
    router.get('/', async (req, res, next) => {
        try {
            const { page, size } = paginationParamsSchema.parse(req.query);
            const options: Pagination = {
                limit: size,
                offset: (page - 1) * size
            }
            const { rows: hotels, count: total } = await hotelService.getHotels(options);
            res.json({
                data: hotels,
                total,
                page,
                size,
                totalPages: Math.ceil(total / size)
            });
        } catch (error) {
            next(error);
        }
    });
    return router;
};