import {MigrationInterface, QueryRunner} from 'typeorm';

export class Participation1554634760560 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`
			CREATE TABLE "participation" (
					"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
					"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
					"status" character varying NOT NULL DEFAULT 'Pending',
					"role" character varying NOT NULL DEFAULT 'Attendee',
					"userId" uuid NOT NULL,
					"eventId" uuid NOT NULL,
					CONSTRAINT "PK_5f612d9a748076aa199fc5d1468" PRIMARY KEY ("userId", "eventId")
			)
		`);

		await queryRunner.query(`
			ALTER TABLE "participation"
			ADD CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f"
			FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
		`);

		await queryRunner.query(`
			ALTER TABLE "participation"
			ADD CONSTRAINT "FK_952a1fb1987a16b3321c660ed84"
			FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_952a1fb1987a16b3321c660ed84"`);
		await queryRunner.query(`ALTER TABLE "participation" DROP CONSTRAINT "FK_8ed09e9b7e0a3a150f9515f254f"`);
		await queryRunner.query(`DROP TABLE "participation"`);
	}

}
