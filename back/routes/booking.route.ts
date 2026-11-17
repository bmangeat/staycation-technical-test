import { bookingIdSchema, bookingListParamsSchema } from '@/schemas/booking.schema';
import { userParamsSchema } from '@/schemas/user.schema';
import type { BookingService } from '@/services/booking.service';
import { Router } from 'express';

export const createBookingRouter = (bookingService: BookingService): Router => {
    const router = Router();

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = bookingIdSchema.parse(req.params);
            const booking = await bookingService.getBooking(id);
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            res.json(booking);
        } catch (error) {
            next(error);
        }
    });

    router.get('/', async (req, res, next) => {
        try {
            const { page, size } = bookingListParamsSchema.parse(req.params);
            const booking = await bookingService.getBookings();
            if (!booking) {
                res.status(404).json({ message: 'Booking not found' });
                return;
            }
            res.json(booking);
        } catch (error) {
            next(error);
        }
    });

    return router;
};