import { AddressService } from './address.service';
import { AddressController } from './address.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [
        AddressController,],
    providers: [
        AddressService,],
})
export class AddressModule { }
