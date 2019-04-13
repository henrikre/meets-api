import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { MeetsDefaultEntity } from 'src/meets-default.entity';
import { Participation } from '../participation/participation.entity';
import { Room } from '../room/room.entity';

@Entity()
export class Event extends MeetsDefaultEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	subject: string;

	@Column('timestamp', { nullable: false })
	from: Date;

	@Column('timestamp', { nullable: false })
	to: Date;

	@ManyToOne(type => Room, room => room.events, { onDelete: 'CASCADE' })
	room: Room;

	@OneToMany(type => Participation, participation => participation.event)
	participants: Participation[];

}
