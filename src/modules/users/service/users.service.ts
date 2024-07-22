import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class UsersService {
	create(createUserInput: CreateUserInput) {
		return 'This action adds a new user';
	}
}
