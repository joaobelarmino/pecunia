import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from 'src/database/repositories/users.repositories';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
	constructor(private readonly usersRepo: UsersRepository) {}

	async signin({ email, password }: SigninDto) {
		/**
		 * Get the existent user with the given email
		 * Compare the given password with the password storage with the existent user password (bcryptjs).
		 * Generate access token and return to the user.
		 */
		const existentUser = await this.usersRepo.findUnique({
			where: { email },
		});

		//install bcrypt
		const isValid = bcrypt.compare(password, existentUser?.password);

		if (!existentUser || !isValid) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}

	async signup({ email, password, name }: SignupDto) {
		/**
		 * Verify if the given email has already been taken
		 * Hash the password using bcryptjs
		 * Create the user using user repo
		 * Generate access token and return to the user.
		 */
	}
}
