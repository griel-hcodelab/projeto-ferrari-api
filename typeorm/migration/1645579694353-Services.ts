import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnId } from "./columns/columnId";
import { createdAt } from "./columns/createdAt";
import { updatedAt } from "./columns/updatedAt";

export class Services1645579694353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "services",
            columns: [columnId,
            {
                name: "name",
                type: "varchar",
                length: "45",
                isNullable: false
            },
            {
                name: "description",
                type: "mediumtext",
                isNullable: false
            },
            {
                name: "price",
                type: "decimal(10,2)",
                isNullable: false,
                unsigned: true,
            },
            createdAt, updatedAt
        ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropTable("services");
    }

}
