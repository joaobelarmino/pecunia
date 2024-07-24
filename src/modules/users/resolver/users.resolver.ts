import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';
import { GetUserId } from '@decorators/GetUserId.decorator';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async getUser(@GetUserId() userId: string): Promise<User> {
		return await this.usersService.findUserById(userId);
	}
}
