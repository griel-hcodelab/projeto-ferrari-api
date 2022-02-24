/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddressService
{
    constructor(private db:PrismaService) { }

    isValidId(id:string)
    {
        const verifyId = Number(id);

        if (isNaN(verifyId) || verifyId < 0) {
            throw new BadRequestException("O ID é inválido");
        }

        return verifyId;

    }

    async getUser(id: string)
    {

        const user = await this.db.user.findUnique({
            where: {
                id: this.isValidId(id)
            }
        });

        if (!user) {
            throw new BadRequestException("O usuário não existe");
        } 

        return user;
    }

    async readAll()
    {

        return this.db.address.findMany();

    }
    async readOne(id:string)
    {

        const address = await this.db.address.findUnique({
            where: {
                id: this.isValidId(id)
            }
        });

        if (!address) {
            throw new BadRequestException("Este endereço não existe");
        }

        return address;   
         

    }

    async create(body, id: number)
    {

        //const { personId } = await this.getUser(body.personId);

        const personId = Number(id);

        await this.db.address.create({
            data: {
                street: body.street,
                number: body.number,
                complement: body.complement,
                district: body.district,
                city: body.city,
                state: body.state,
                country: body.country,
                zipcode: body.zipcode,
                personId
            }
        });
    }

    async update(body, addressId: string)
    {
        const { personId } = await this.getUser(body.personId);

        const { id } = await this.readOne(addressId);

        const address = await this.db.address.update({
            where: {
                id: Number(id)
            },
            data : {
                street: body.street,
                number: body.number,
                complement: body.complement,
                district: body.district,
                city: body.city,
                state: body.state,
                country: body.country,
                zipcode: body.zipcode,
                personId
            }
        });

        return address;

    }

    async destroy(addressId: string)
    {
        const { id } = await this.readOne(addressId);

        return this.db.address.delete({
            where: {
                id: Number(id)
            }
        })
    }
}
