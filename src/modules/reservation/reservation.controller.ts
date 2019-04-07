import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ParseUuidsPipe } from 'src/pipes/parse-uuids.pipe';
import { CreateReservationDto } from './create-reservation.dto';

@Controller('reservations')
export class ReservationController {

	constructor(private reservationService: ReservationService) {}

	@Get()
	getReservations() {
		return this.reservationService.getReservations()
	}

	@Get('/:id')
	getReservation(@Param('id', new ParseUuidsPipe()) id: string) {
		console.log(id)
		return this.reservationService.getReservation(id)
	}

	@Post()
	createReservation(@Body() dto: CreateReservationDto) {
		return this.reservationService.createReservation(dto)
	}

	@Put('/:id')
	editReservation(@Param('id', new ParseUuidsPipe()) id, @Body() dto: CreateReservationDto) {
		return this.reservationService.editReservation({ ...dto, id })
	}

	@Delete('/:id')
	deleteReservation(@Param('id', new ParseUuidsPipe()) id: Array<string>) {
		this.reservationService.deleteReservation(id)
	}

}
