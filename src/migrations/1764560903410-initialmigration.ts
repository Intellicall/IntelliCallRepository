import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialmigration1764560903410 implements MigrationInterface {
    name = 'Initialmigration1764560903410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customerdata" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_7303eea1802c07500f88656da97" DEFAULT NEWSEQUENTIALID(), "name" varchar(255) NOT NULL, "email" varchar(255) NOT NULL, "password" varchar(255), "textContent" text, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7dab621cae16f5aa6bf7847bd42" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_479aa52c8ebf3bdad328ba99696" DEFAULT getdate(), CONSTRAINT "UQ_f909a09960dba9d5fe2c79fe43c" UNIQUE ("email"), CONSTRAINT "PK_7303eea1802c07500f88656da97" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customerdata"`);
    }

}
