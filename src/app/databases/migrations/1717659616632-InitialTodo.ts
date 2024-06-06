import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTodo1717659616632 implements MigrationInterface {
    name = "InitialTodo1717659616632"
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "todo" (
                "id" INTEGER,
                "title"	TEXT NOT NULL UNIQUE,
                "completed"	INTEGER,
                PRIMARY KEY("id" AUTOINCREMENT)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
