import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export abstract class MeetsDefaultEntity {

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

}
