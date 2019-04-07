import * as R from 'ramda'
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { CreateReservationDto } from './create-reservation.dto';
import { RoomRepository } from '../room/room.repository';

@Injectable()
export class ReservationService {

	constructor(
		@InjectRepository(RoomRepository)
		private roomRepository: RoomRepository,
		@InjectRepository(ReservationRepository)
		private reservationRepository: ReservationRepository,
	) {}

	reservations = [{
		id: 1,
		roomId: 1,
		from: '2019-04-02T08:00:00.000Z',
		to: '2019-04-02T08:45:00.000Z'
	}, {
		id: 2,
		roomId: 1,
		from: '2019-04-02T08:45:00.000Z',
		to: '2019-04-02T09:00:00.000Z'
	}, {
		id: 3,
		roomId: 2,
		from: '2019-04-02T07:45:00.000Z',
		to: '2019-04-02T08:45:00.000Z'
	}]

	getReservations(): Promise<any> {
		return this.reservationRepository.find()
	}

	getReservation(id: string): Promise<any> {
		return this.reservationRepository.findOne(id)
	}

	async createReservation(dto: CreateReservationDto) {
		const room = await this.roomRepository.findOne(dto.roomId)
		const newReservation = Object.assign(this.reservationRepository.create(), dto, { room })

		return this.reservationRepository.save(newReservation)
	}

	editReservation(dto) {
		return new Promise(res => {
			this.reservations = this.reservations
				.map(r => r.id === dto.id ? dto : r)
			res(dto)
		})
	}

	deleteReservation(id: string[]) {
		return this.reservationRepository.delete(id)
	}

}
