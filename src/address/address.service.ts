/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidId } from 'utils/validation-id';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService
{
    constructor(private db:PrismaService) { }

    

    async findAll()
    {
        return this.db.address.findMany();
    }

    async findOne(id: number)
    {


        return this.db.address.findUnique({
            where: {
                id: id
            },
        });

    }

    async getUser(id: string)
    {

        const user = await this.db.user.findUnique({
            where: {
                id: isValidId(id)
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
                id: isValidId(id)
            }
        });

        if (!address) {
            throw new BadRequestException("Este endereço não existe");
        }

        return address;   
         

    }

    async findByUser(userId: number)
    {
        return this.db.address.findMany({
            where: {
                personId: isValidId(userId)
            }
        });
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

    async update(id: number, data: UpdateAddressDto, personId /*, addressId: string*/)
    {

        personId = isValidId(personId);

        const address = await this.findOne(personId);

        if (address.personId !== personId) {
            throw new BadRequestException("Operação inválida")
        }

        return this.db.address.update({
            data: data,
            where: {
                id: isValidId(id)
            }
        });

        // const { personId } = await this.getUser(body.personId);

        // const { id } = await this.readOne(addressId);

        // const address = await this.db.address.update({
        //     where: {
        //         id: Number(id)
        //     },
        //     data : {
        //         street: body.street,
        //         number: body.number,
        //         complement: body.complement,
        //         district: body.district,
        //         city: body.city,
        //         state: body.state,
        //         country: body.country,
        //         zipcode: body.zipcode,
        //         personId
        //     }
        // });

        // return address;

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
