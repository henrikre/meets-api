import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomModule } from './room/room.module';
import { EventModule } from './event/event.module';

@Module({
	imports: [
		RoomModule,
		EventModule,

		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'meets_api',
			password: 'devpassword',
			database: 'meets',
			dropSchema: false,
			synchronize: false,
			migrationsRun: true,
			entities: [
				__dirname + '/**/*.entity{.ts,.js}',
			],
			migrations: ['migrations/*.ts'],
			cli: {
				migrationsDir: 'migrations',
			},
		}),
	],

	providers: [],
})

export class ApiModule {}
