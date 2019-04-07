import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';
import { MeetsDefaultEntity } from 'src/meets-default.entity';

@Entity()
export class Room extends MeetsDefaultEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	name: string;

	@OneToMany(type => Reservation, reservation => reservation.room, { onDelete: 'CASCADE' })
	reservations: Reservation[];

}
