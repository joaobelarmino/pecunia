import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		AuthModule,
		GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
			context: ({ req }) => ({ req }),
		}),
		DatabaseModule,
	],
})
export class AppModule {}
