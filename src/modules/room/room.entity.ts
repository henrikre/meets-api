import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MeetsDefaultEntity } from 'src/meets-default.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Room extends MeetsDefaultEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	name: string;

	@OneToMany(type => Event, event => event.room, { onDelete: 'CASCADE' })
	events: Event[];

}
