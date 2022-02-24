/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';

import { AddressService } from './address.service';

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
    @Post()
    create(@Body() body, @User() user)
    {

        const data = this.isValidData(body);

        return this.addressService.create(data, user.personId);

    }

    @Patch(':id')
    update(@Body() body, @Param('id') id: string)
    {
        const data = this.isValidData(body);

        return this.addressService.update(data, id);
    }

    @Delete(':id')
    destroy(@Param('id') id: string)
    {
        return this.addressService.destroy(id);
    }


}
