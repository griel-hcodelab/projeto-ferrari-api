/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';

import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller("address")
export class AddressController 
{
    constructor(private addressService: AddressService) { }

    isValidData(data: any): object
    {
        if (!data.street) {
            throw new BadRequestException("O endereço é obrigatório");
        }
        if (!data.district) {
            throw new BadRequestException("O bairro é obrigatório");
        }
        if (!data.city) {
            throw new BadRequestException("A cidade é obrigatória");
        }
        if (!data.state) {
            throw new BadRequestException("O estado é obrigatório");
        }
        if (!data.country) {
            throw new BadRequestException("O país é obrigatório");
        }
        if (!data.zipcode) {
            throw new BadRequestException("O CEP é obrigatório");
        }


        return data;
    }

    @UseGuards(AuthGuard)
    @Get()
    async listAll()
    {
        return this.addressService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async listOne(@Param('id', ParseIntPipe) id)
    {
        return this.addressService.findOne(id);
    }

    @Get(':id')
    readOne(@Param("id") id: string)
    {
        return this.addressService.readOne(id);
    }
    @Get()
    readAll()
    {
        return this.addressService.readAll();
    }

    @UseGuards(AuthGuard)
    @Get('my')
    async listByPerson(
        @User() user
    )
    {
        return this.addressService.findByUser(user.personId)
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() body, @User() user)
    {

        const data = this.isValidData(body);

        return this.addressService.create(data, user.personId);

    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    update(
        @Body() data: UpdateAddressDto,
        @Param('id', ParseIntPipe) id,
        @User() userPersonId)
    {
        return this.addressService.update(id, data, userPersonId);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    destroy(@Param('id') id: string)
    {
        return this.addressService.destroy(id);
    }


    @Get('/cep/:cep')
    async getCep(@Param('cep') cep: string)
    {
        return this.addressService.searchCep(cep);
    }


}
