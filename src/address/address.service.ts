/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService
{
    constructor(private db:PrismaService, private httpService: HttpService) { }

    

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
                id: isValidNumber(id)
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
                id: isValidNumber(id)
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
                personId: isValidNumber(userId)
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

        personId = isValidNumber(personId);

        const address = await this.findOne(personId);

        if (address.personId !== personId) {
            throw new BadRequestException("Operação inválida")
        }

        return this.db.address.update({
            data: data,
            where: {
                id: isValidNumber(id)
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

    async searchCep(cep: string)
    {

        cep = cep.replace(/[^\d]+/g,'').substring(0,8);

        //Lastvaluefrom trás o ultimo resultado de uma promisse, é um observavle
        const response = await lastValueFrom(this.httpService.request({
            method: 'GET',
            url: `https://viacep.com.br/ws/${cep}/json/`
        }));

        return response.data;
    }
}
