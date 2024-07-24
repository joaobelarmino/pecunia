import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { env } from '@config/env';
import { IS_PUBLIC_KEY } from '@decorators/isPublic.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getClass(),
			context.getHandler(),
		]);

		if (isPublic) {
			return true;
		}

		const ctx = GqlExecutionContext.create(context);
		const request = ctx.getContext().req;
		return this.validateRequest(request);
	}

	async validateRequest(request: Request): Promise<boolean> {
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException('You have no access to this data.');
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: env.jwtSecret,
			});

			request['userId'] = payload.sub;
		} catch {
			throw new UnauthorizedException('You have no access to this data.');
		}

		return true;
	}

	extractTokenFromHeader(request: Request) {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}
}
