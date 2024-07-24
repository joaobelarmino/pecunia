import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from '@decorators/isPublic.decorator';
import { SigninDto } from '../dto/signin.dto';
import { SignupDto } from '../dto/signup.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
@IsPublic()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	async authenticate(@Body() signinDto: SigninDto) {
		return await this.authService.signin(signinDto);
	}

	@Post('signup')
	async register(@Body() signupDto: SignupDto) {
		return await this.authService.signup(signupDto);
	}
}
