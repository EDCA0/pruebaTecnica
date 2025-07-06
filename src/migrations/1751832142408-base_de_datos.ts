import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseDeDatos1751832142408 implements MigrationInterface {
    name = 'BaseDeDatos1751832142408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."books_genre_enum" AS ENUM('Aventura', 'Ciencia Ficción', 'Fantasía', 'Misterio', 'Terror', 'Romance', 'Thriller / Suspense', 'Novela Histórica', 'Novela Gráfica / Cómic', 'Distopía', 'Juvenil (Young Adult)', 'Biografías / Memorias', 'Historia', 'Divulgación Científica', 'Psicología', 'Política', 'Negocios y Economía', 'Autoayuda', 'Ensayo', 'Poesía')`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "author" character varying(80) NOT NULL, "year" integer NOT NULL, "genre" "public"."books_genre_enum" NOT NULL, CONSTRAINT "CHK_5afef45c399d94deb64f4f7575" CHECK ("year" >= 1455 AND "year" <= EXTRACT(YEAR FROM CURRENT_DATE)), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")); COMMENT ON COLUMN "books"."title" IS 'Titulo completo del libro'; COMMENT ON COLUMN "books"."author" IS 'Nombre completo del autor'; COMMENT ON COLUMN "books"."year" IS 'Año de publicación del libro'; COMMENT ON COLUMN "books"."genre" IS 'Género literario del libro'`);
        await queryRunner.query(`CREATE INDEX "IDX_3cd818eaf734a9d8814843f119" ON "books" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_6f50357a540439c8d17050c830" ON "books" ("genre") `);
        await queryRunner.query(`CREATE INDEX "IDX_3341fe7b19c44daf13086cf9a2" ON "books" ("author", "year") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3341fe7b19c44daf13086cf9a2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f50357a540439c8d17050c830"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3cd818eaf734a9d8814843f119"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TYPE "public"."books_genre_enum"`);
    }

}
