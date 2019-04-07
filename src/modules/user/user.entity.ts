import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MeetsDefaultEntity } from "src/meets-default.entity";
import { Participation } from "../participation/participation.entity";

@Entity()
export class User extends MeetsDefaultEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ nullable: false })
	email: string;

	@Column({ nullable: false })
	firstName: string;
	
	@Column({ nullable: false })
	lastName: string;

	@OneToMany(type => Participation, participation => participation.user)
	meetings: Participation[]

}
