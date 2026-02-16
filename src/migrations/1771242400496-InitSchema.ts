import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1771242400496 implements MigrationInterface {
    name = 'InitSchema1771242400496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saved_item" ("id" SERIAL NOT NULL, "externalId" character varying NOT NULL, "type" character varying NOT NULL, "src" character varying NOT NULL, "thumbnail" character varying NOT NULL, "title" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "collectionId" integer, "userId" integer, CONSTRAINT "PK_caa9a4e273f8940a00dc3eb713f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "saved_item" ADD CONSTRAINT "FK_b84e1d2955bc9265affff2921d4" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "saved_item" ADD CONSTRAINT "FK_10603d69cf642bd18e374adbe07" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_da613d6625365707f8df0f65d81" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_da613d6625365707f8df0f65d81"`);
        await queryRunner.query(`ALTER TABLE "saved_item" DROP CONSTRAINT "FK_10603d69cf642bd18e374adbe07"`);
        await queryRunner.query(`ALTER TABLE "saved_item" DROP CONSTRAINT "FK_b84e1d2955bc9265affff2921d4"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "saved_item"`);
    }

}
