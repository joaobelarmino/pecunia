import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
	@Field(() => String, {
		description: 'User email address',
	})
	email: string;

	@Field(() => String, {
		description: 'User name',
	})
	name: string;
}
