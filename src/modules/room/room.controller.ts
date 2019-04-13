import * as R from 'ramda';
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './create-room.dto';
import { ParseUuidsPipe } from 'src/pipes/parse-uuids.pipe';

@Controller('rooms')
export class RoomController {

	constructor(private roomService: RoomService) {}

	@Get()
	getRooms() {
		return this.roomService.getRooms();
	}

	@Get('/:id')
	getRoom(@Param('id', new ParseUuidsPipe()) id: string[]) {
		return this.roomService.getRoom(id);
	}

	@Post()
	addRoom(@Body() createRoomDto: CreateRoomDto) {
		return this.roomService.addRoom(createRoomDto);
	}

	@Delete('/:id')
	deleteRoom(@Param('id', new ParseUuidsPipe()) id: string[]) {
		return this.roomService.deleteRoom(id);
	}

}
