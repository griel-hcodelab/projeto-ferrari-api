import { BadRequestException } from "@nestjs/common";

export const isValidNumber = (id: any, message: string = "ID is invalid.") => {
        
    id = Number(id);

    if (isNaN(id)) {
        throw new BadRequestException(message);
    }

    return id;

}