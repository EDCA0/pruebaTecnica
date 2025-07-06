import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAuthor1751773825889 implements MigrationInterface {
    name = 'ChangeAuthor1751773825889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "autor" TO "author"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "author" TO "autor"`);
    }

}
