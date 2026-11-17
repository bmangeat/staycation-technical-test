
import type { Pagination } from '@/domain/pagination';
import type { BookingRepository } from '@/repositories/booking.repository';

export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}
  async getBooking(bookingId: number) {
    return this.bookingRepository.findOne(bookingId);
  }

  async getBookings(options?: Pagination) {
    return this.bookingRepository.findAll(options);
  }
}
