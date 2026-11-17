import { userParamsSchema } from '@/schemas/user.schema';
import type { UsersService } from '@/services/user.service';
import { Router } from 'express';

export const createUsersRouter = (usersService: UsersService): Router => {
    const router = Router();

    router.get('/:id', async (req, res, next) => {
        try {
            const { id } = userParamsSchema.parse(req.params);
            const user = await usersService.getUser(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    });

    return router;
};