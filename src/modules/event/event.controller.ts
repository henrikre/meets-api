import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ParseUuidsPipe } from 'src/pipes/parse-uuids.pipe';
import { CreateEventDto } from './create-event.dto';
import { EventService } from './event.service';

@Controller('reservations')
export class EventController {

	constructor(private eventService: EventService) {}

	@Get()
	getEvents() {
		return this.eventService.getEvents();
	}

	@Get('/:id')
	getEvent(@Param('id', new ParseUuidsPipe()) id: string) {
		return this.eventService.getEvent(id);
	}

	@Post()
	createReservation(@Body() dto: CreateEventDto) {
		return this.eventService.createEvent(dto);
	}

	@Put('/:id')
	editEvent(@Param('id', new ParseUuidsPipe()) id, @Body() dto: CreateEventDto) {
		return this.eventService.editEvent({ ...dto, id });
	}

	@Delete('/:id')
	deleteEvent(@Param('id', new ParseUuidsPipe()) id: string[]) {
		this.eventService.deleteEvent(id);
	}

}
