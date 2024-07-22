import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createDto: Prisma.UserCreateArgs) {
		return await this.prismaService.user.create(createDto);
	}

	async findUnique(userDto: Prisma.UserFindUniqueArgs) {
		return await this.prismaService.user.findUnique(userDto);
	}
}
