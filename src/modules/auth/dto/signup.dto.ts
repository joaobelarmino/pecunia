import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
} from 'class-validator';

export class SignupDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword({
		minLength: 6,
		minLowercase: 1,
		minUppercase: 1,
		minSymbols: 1,
		minNumbers: 1,
	})
	@IsNotEmpty()
	password: string;
}
