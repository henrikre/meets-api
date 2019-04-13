import {MigrationInterface, QueryRunner} from 'typeorm';

export class BaseModels1554469331456 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "btree_gist";`);

		await queryRunner.query(`
			CREATE TABLE "room" (
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"name" character varying NOT NULL,
				CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
			)
		`);

		await queryRunner.query(`
			CREATE TABLE "event" (
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"subject" character varying NOT NULL,
				"from" TIMESTAMP NOT NULL,
				"to" TIMESTAMP NOT NULL,
				"roomId" uuid,
				CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")
			)
		`);

		await queryRunner.query(`
			ALTER TABLE "event"
  		ADD CONSTRAINT no_overlapping_events
			EXCLUDE USING gist (
				"roomId" WITH =,
				tsrange("from", "to", '()') WITH &&
			)
		`);

		await queryRunner.query(`
			CREATE TABLE "user" (
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"id" uuid NOT NULL DEFAULT uuid_generate_v4(),
				"email" character varying NOT NULL,
				"firstName" character varying NOT NULL,
				"lastName" character varying NOT NULL,
				CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
			)
		`);

		await queryRunner.query(`
			ALTER TABLE "event"
			ADD CONSTRAINT "FK_ee6959f2cbe32d030b5e58b45d7"
			FOREIGN KEY ("roomId") REFERENCES "room"("id")
			ON DELETE CASCADE ON UPDATE NO ACTION
		`);

	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`
			ALTER TABLE "event"
			DROP CONSTRAINT "FK_ee6959f2cbe32d030b5e58b45d7"
		`);

		await queryRunner.query(`DROP TABLE "user"`);
		await queryRunner.query(`DROP TABLE "event"`);
		await queryRunner.query(`DROP TABLE "room"`);

		await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
		await queryRunner.query(`DROP EXTENSION IF EXISTS "btree_gist";`);
	}

}
