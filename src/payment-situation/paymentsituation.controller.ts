import { PaymentSituationService } from './paymentsituation.service';

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller("payment-situation")
export class PaymentSituationController
{
    constructor(private paymentService: PaymentSituationService) {}

    @Post()
    create(@Body('name') name: string)
    {
        return this.paymentService.create(name);
    }

    @Get(':id')
    readOne(@Param('id') id:string)
    {
        return this.paymentService.readOne(id);
    }

    @Get()
    readAll()
    {
        return this.paymentService.readAll();
    }

    @Put(':id')
    update(@Body('name') name:string, @Param('id') id:string)
    {
        return this.paymentService.update({name, id})
    }

    @Delete(':id')
    destroy(@Param('id') id:string)
    {
        return this.paymentService.destroy(id);
    }
}
