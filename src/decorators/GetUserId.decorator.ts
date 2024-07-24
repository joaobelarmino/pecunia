import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserId = createParamDecorator<unknown>(
	(_, context: ExecutionContext) => {
		const gqlContext = GqlExecutionContext.create(context);
		const request = gqlContext.getContext().req;

		if (!request.userId) {
			throw new UnauthorizedException('You have no access to this data.');
		}

		return request.userId;
	},
);
