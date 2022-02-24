import { BadRequestException } from "@nestjs/common";

export const isValidId = (id)=>{
    const verifyId = Number(id);

    if (isNaN(verifyId) || verifyId < 0) {
        throw new BadRequestException("O ID é inválido");
    }

    return verifyId;

}