import {
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '@repositories/users.repositories';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { compare, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepo: UsersRepository,
		private readonly jwtService: JwtService,
	) {}

	async signin({ email, password }: SigninDto) {
		const existentUser = await this.usersRepo.findUnique({
			where: { email },
		});

		if (!existentUser) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const isValid = await compare(password, existentUser?.password);

		if (!isValid) {
			throw new UnauthorizedException('Invalid credentials.');
		}

		const accessToken = await this.generateJwtAccessToken(existentUser.id);

		return { accessToken };
	}

	async signup({ email, password, name }: SignupDto) {
		const existentUser = await this.usersRepo.findUnique({
			where: { email },
		});

		if (existentUser) {
			throw new ConflictException('This email has already been taken.');
		}

		const hashedPassword = hashSync(password, 12);

		const newUser = await this.usersRepo.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		const accessToken = await this.generateJwtAccessToken(newUser.id);

		return { accessToken };
	}

	private async generateJwtAccessToken(userId: string) {
		return await this.jwtService.signAsync({ sub: userId });
	}
}
