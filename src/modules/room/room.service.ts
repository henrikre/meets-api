import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { CreateRoomDto } from './create-room.dto';
import { DeepPartial } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {

	constructor(
		@InjectRepository(RoomRepository)
		private roomRepository: RoomRepository,
	) {}

	getRooms(): Promise<DeepPartial<Room[]>> {
		return this.roomRepository.find();
	}

	getRoom(id: string[]): Promise<any> {
		if (id.length > 1) {
			return this.roomRepository.findByIds(id);
		}

		return this.roomRepository.findOne(id[0]);
	}

	addRoom(room: CreateRoomDto): Promise<any> {
		const newRoom = this.roomRepository.create(room);
		return this.roomRepository.save(newRoom);
	}

	deleteRoom(id: string[]): Promise<any> {
		return this.roomRepository.delete(id);
	}

}
