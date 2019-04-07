import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, OneToOne } from 'typeorm';
import { Room } from '../room/room.entity';
import { MeetsDefaultEntity } from 'src/meets-default.entity';
import { Participation } from '../participation/participation.entity';

@Entity()
export class Reservation extends MeetsDefaultEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('timestamp', { nullable: false })
	from: Date;

	@Column('timestamp', { nullable: false })
	to: Date;

	@ManyToOne(type => Room, room => room.reservations, { onDelete: 'CASCADE' })
	room: Room

	@OneToMany(type => Participation, participation => participation.reservation)
	participants: Participation[]

}
