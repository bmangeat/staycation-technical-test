
import type { UsersRepository } from '@/repositories/user.repository'

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUser(userId: number) {
    return this.usersRepository.findOne(userId);
  }
}
