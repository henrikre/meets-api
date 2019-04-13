import { Entity, Column, ManyToOne } from 'typeorm';
import { MeetsDefaultEntity } from 'src/meets-default.entity';
import { Event } from '../event/event.entity';
import { User } from '../user/user.entity';

export type Status
	=	'Pending'
	|	'Confirmed'
	| 'Cancelled';

export type Role
	= 'Attendee'
	| 'Organizer';

@Entity()
export class Participation extends MeetsDefaultEntity {

	@Column({ default: 'Pending' })
	status: Status;

	@Column({ default: 'Attendee' })
	role: Role;

	@ManyToOne(type => User, user => user.events, {
		primary: true,
	})
	user: User;

	@ManyToOne(type => Event, event => event.participants, {
		primary: true,
	})
	event: Event;

}
