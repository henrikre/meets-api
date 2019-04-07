import { Entity, Column, ManyToOne } from "typeorm";
import { MeetsDefaultEntity } from "src/meets-default.entity";
import { Reservation } from "../reservation/reservation.entity";
import { User } from "../user/user.entity";

export type Status
	=	'Pending'
	|	'Confirmed'
	| 'Cancelled'

export type Role
	= 'Attendee'
	| 'Organizer'

@Entity()
export class Participation extends MeetsDefaultEntity {

	@Column({ default: 'Pending' })
	status: Status

	@Column({ default: 'Attendee' })
	role: Role

	@ManyToOne(type => User, user => user.meetings, {
		primary: true
	})
	user: User

	@ManyToOne(type => Reservation, reservation => reservation.participants, {
		primary: true
	})
	reservation: Reservation

}
