import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnId } from "../columns/columnId";
import { createdAt } from "../columns/createdAt";
import { typeVarchar } from "../columns/typeVarchar";
import { updatedAt } from "../columns/updatedAt";

export class PaymentSituations1645634285818 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "payment_situations",
            columns: [
                columnId,
                typeVarchar("name", "45"),
                createdAt,
                updatedAt
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropTable("payment_situations");
    }

}
