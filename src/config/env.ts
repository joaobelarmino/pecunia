import * as process from 'process';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
	@IsString()
	@IsNotEmpty()
	@NotEquals('unsecure_jwt_secret')
	jwtSecret: string;
}

export const env: Env = plainToInstance(Env, {
	jwtSecret: process.env.JWT_SECRET,
});

const errors = validateSync(env);

if (errors.length) {
	throw new Error(JSON.stringify(errors, null, 4));
}
