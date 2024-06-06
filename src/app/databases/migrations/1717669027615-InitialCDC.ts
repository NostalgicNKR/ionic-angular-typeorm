import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCDC1717669027615 implements MigrationInterface {
    name = "InitialCDC1717669027615"
    public async up(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.query(`
            CREATE TABLE "cdc" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                "table_name" TEXT NOT NULL,
                "row_id" INTEGER NOT NULL,
                "operation_type" TEXT NOT NULL,
                "operation_timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                "changed_data" TEXT NOT NULL,
                "metadata" TEXT DE
            )
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.query(`
            DROP TABLE "cdc"
        `);
    }

}
