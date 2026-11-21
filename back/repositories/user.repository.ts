import { toUser, type User, type DbUserRow } from '@/domain/user';
import DB from '@/db';

export class UserRepository {
  async findOne(userId: number): Promise<User | undefined> {
    const result = await DB.query<DbUserRow>('SELECT * FROM users WHERE id=$1::int', [userId]);
    const row = result.rows[0];
    return !row ? undefined : toUser(row);
  }
}
