import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { UsersService } from '../service/users.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => User)
	createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
		return this.usersService.create(createUserInput);
	}
}
