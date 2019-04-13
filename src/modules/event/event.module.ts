import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { RoomModule } from '../room/room.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			EventRepository,
		]),
		RoomModule,
	],
	controllers: [EventController],
	providers: [EventService],
})

export class EventModule {}
