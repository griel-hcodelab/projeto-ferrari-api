import { TableColumnOptions } from "typeorm";

export function typeVarchar(name: string, length: string = "255", nullable: boolean = false){

    return {
        name: name,
        type: "varchar",
        length: length,
        isNullable: nullable
    } as TableColumnOptions;

} 