import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repositories';

@Module({
	providers: [UsersRepository],
	exports: [UsersRepository],
})
export class DatabaseModule {}
