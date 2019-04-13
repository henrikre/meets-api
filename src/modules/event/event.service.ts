import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { CreateEventDto } from './create-event.dto';
import { RoomRepository } from '../room/room.repository';

@Injectable()
export class EventService {

	constructor(
		@InjectRepository(RoomRepository)
		private roomRepository: RoomRepository,
		@InjectRepository(EventRepository)
		private eventRepository: EventRepository,
	) {}

	events = [{
		id: 1,
		roomId: 1,
		from: '2019-04-02T08:00:00.000Z',
		to: '2019-04-02T08:45:00.000Z',
	}, {
		id: 2,
		roomId: 1,
		from: '2019-04-02T08:45:00.000Z',
		to: '2019-04-02T09:00:00.000Z',
	}, {
		id: 3,
		roomId: 2,
		from: '2019-04-02T07:45:00.000Z',
		to: '2019-04-02T08:45:00.000Z',
	}];

	getEvents(): Promise<any> {
		return this.eventRepository.find();
	}

	getEvent(id: string): Promise<any> {
		return this.eventRepository.findOne(id);
	}

	async createEvent(dto: CreateEventDto) {
		const room = await this.roomRepository.findOne(dto.roomId);
		const newEvent = Object.assign(this.eventRepository.create(), dto, { room });

		return this.eventRepository.save(newEvent);
	}

	editEvent(dto) {
		return new Promise(res => {
			this.events = this.events
				.map(r => r.id === dto.id ? dto : r);

			res(dto);
		});
	}

	deleteEvent(id: string[]) {
		return this.eventRepository.delete(id);
	}

}
