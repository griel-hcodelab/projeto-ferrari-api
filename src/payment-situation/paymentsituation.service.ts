import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentSituationService
{
    constructor(private db: PrismaService) {}

    isValidId(id: string): number
    {
        const validateId = Number(id);

        if (!validateId || isNaN(validateId) || validateId < 0) {
            throw new BadRequestException("O ID é inválido");
        }

        return validateId;
    }

    isValidName(name:string)
    {
        if (!name) {
            throw new BadRequestException("O nome da situação do pagamento é obrigatória");
        } else if (name.length <= 3) {
            throw new BadRequestException("O nome precisa ter mais de três caracteres");
        }

        return name;
    }

    async create(name: string)
    {

        return this.db.paymentSituation.create({
            data: {
                name: this.isValidName(name)
            }
        });
    }

    async readAll()
    {

        const paymentSituation = await this.db.paymentSituation.findMany();

        return paymentSituation;

    }

    async readOne(id: string)
    {

        const paymentSituation = await this.db.paymentSituation.findUnique({
            where: {
                id: this.isValidId(id)
            }
        });

        if (!paymentSituation) {
            throw new BadRequestException("Não existe essa situação de pagamento");
        }

        return paymentSituation;

    }

    async update(data)
    {


        const paymentSituation = await this.db.paymentSituation.update({
            where: {
                id: this.isValidId(data.id)
            },
            data: {
                name: this.isValidName(data.name)
            }
        });

        return paymentSituation;

    }

    async destroy(situationId: string)
    {
        const { id } = await this.readOne(situationId);

        const paymentSituation = await this.db.paymentSituation.delete(
            {
                where: {
                    id: Number(id)
                }
            }
        );

        return paymentSituation;
    }
}
