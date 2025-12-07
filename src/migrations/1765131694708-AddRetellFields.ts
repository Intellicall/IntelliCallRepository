import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRetellFields1765131694708 implements MigrationInterface {
    name = 'AddRetellFields1765131694708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customerdata" ADD "website" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "customerdata" ADD "companyname" varchar(255)`);
        await queryRunner.query(`ALTER TABLE "customerdata" ADD "knowledgeBaseId" varchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customerdata" DROP COLUMN "knowledgeBaseId"`);
        await queryRunner.query(`ALTER TABLE "customerdata" DROP COLUMN "companyname"`);
        await queryRunner.query(`ALTER TABLE "customerdata" DROP COLUMN "website"`);
    }

}
