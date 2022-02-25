import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import { createdAt } from "../columns/createdAt";
import { updatedAt } from "../columns/updatedAt";

export class ScheduleServices1645750077999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(new Table({
            name: "schedule_services",
            columns: [
                {
                    name: "scheduleId",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "serviceId",
                    type: "int",
                    isPrimary: true,  
                }, createdAt, updatedAt
            ]
        }));

        await queryRunner.createForeignKey("schedule_services", new TableForeignKey({
            columnNames: ["scheduleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "schedules",
            onDelete: "CASCADE",
            name: "FK_schedules_services_schedules"
        }));
        await queryRunner.createForeignKey("schedule_services", new TableForeignKey({
            columnNames: ["serviceId"],
            referencedColumnNames: ["id"],
            referencedTableName: "services",
            onDelete: "CASCADE",
            name: "FK_schedules_services_services"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {

        // ["FK_schedules_services_schedules","FK_schedules_services_services"].forEach(async(fkName)=>{
        //     await queryRunner.dropForeignKey("schedule_services",`${fkName}`)
        // });

        await queryRunner.dropForeignKey("schedule_services","FK_schedules_services_schedules");
        await queryRunner.dropForeignKey("schedule_services","FK_schedules_services_services");

        await queryRunner.dropTable("schedule_services");

    }

}
