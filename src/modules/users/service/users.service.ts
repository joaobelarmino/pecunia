import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repositories';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepository) {}

	async findUserById(userId: string): Promise<User> {
		const user = await this.usersRepo.findUnique({
			where: { id: userId },
			select: { email: true, name: true },
		});

		if (!user) {
			throw new NotFoundException('User not found.');
		}

		return user;
	}
}
