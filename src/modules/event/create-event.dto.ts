import { IsDateString, IsUUID } from 'class-validator';
import { IsBefore } from 'src/validation/is-before.validation';

export class CreateEventDto {

	@IsUUID()
	roomId: string;

	@IsDateString()
	@IsBefore('to', { message: 'Event must end after its\' start time' })
	from: string;

	@IsDateString()
	to: string;

}
