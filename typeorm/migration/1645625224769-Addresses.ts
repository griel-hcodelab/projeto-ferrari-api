import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { columnId } from "../columns/columnId";
import { createdAt } from "../columns/createdAt";
import { typeVarchar } from "../columns/typeVarchar";
import { updatedAt } from "../columns/updatedAt";

export class Addresses1645625224769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "addresses",
            columns: [
                columnId,
                typeVarchar("street","191"),
                typeVarchar("number","16",true),
                typeVarchar("complement","191",true),
                typeVarchar("district","191"),
                typeVarchar("city","191"),
                typeVarchar("state","191"),
                typeVarchar("country","191"),
                typeVarchar("zipcode","8"),
                {
                    name: "personId",
                    type: "int",
                    isNullable: false,
                },
                createdAt,
                updatedAt
            ]
        }));

        await queryRunner.createForeignKey("addresses", new TableForeignKey({
            columnNames: ["personId"],
            referencedColumnNames: ["id"],
            referencedTableName: "persons",
            name: "FK_addresses_people",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropForeignKey("addresses", "FK_addresses_people");
        await queryRunner.dropTable("addresses");
    }

}
