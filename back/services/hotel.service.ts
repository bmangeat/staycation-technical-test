
import type { Pagination } from '@/domain/pagination';
import type { GetHotelsDto } from '@/dto/hotels.dto';
import { computePercentDiscount } from '@/lib/compute-discount';
import type { HotelsRepository } from '@/repositories/hotel.repository';
import type { OpeningRepository } from '@/repositories/opening.repository';
import type { SaleDatesRepository } from '@/repositories/sale-dates.repository';

export class HotelService {
  constructor(
    private readonly hotelsRepository: HotelsRepository,
    private readonly openingsRepository: OpeningRepository,
    private readonly saleDatesRepository: SaleDatesRepository,
  ) { }
  async getHotels(options?: Pagination): Promise<GetHotelsDto> {
    const [hotels, mostRecentSaleDatesId] = await Promise.all([
      this.hotelsRepository.findAllWithStats(options),
      this.saleDatesRepository.findMostRecentSaleDatesId()
    ]);

    if (!mostRecentSaleDatesId) throw new Error("No sale dates retrieved.")
    const ids = hotels.rows.map(h => h.id);
    const bestPrices = await this.openingsRepository.findLowestOpeningByHotelIds(ids);

    const data = hotels.rows.map(hotel => {
      const hotelPrices = bestPrices.get(hotel.id)
      const price = hotelPrices ? {
        defaultPrice: hotelPrices.price,
        discountPrice: hotelPrices.discountPrice,
        isCurrentSale: mostRecentSaleDatesId === hotelPrices.saleId,
        discountPercent: computePercentDiscount(hotelPrices.price, hotelPrices.discountPrice)
      } : null;
      return {
        ...hotel,
        price,
      }
    })

    return {
      rows: data,
      count: hotels.count,
    }
  }
}
