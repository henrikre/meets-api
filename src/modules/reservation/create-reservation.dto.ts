import { IsDateString, IsUUID } from 'class-validator';
import { IsBefore } from 'src/validation/is-before.validation';

export class CreateReservationDto {

	@IsUUID()
	roomId: string;

	@IsDateString()
	@IsBefore('to', { message: 'Reservation must end after its\' start time' })
	from: string;
	
	@IsDateString()
	to: string;

}
