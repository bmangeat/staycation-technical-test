
import type { UserRepository } from '@/repositories/user.repository'

export class UserService {
  constructor(private readonly usersRepository: UserRepository) { }
  async getUser(userId: number) {
    return this.usersRepository.findOne(userId);
  }
}
