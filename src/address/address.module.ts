import { AddressService } from './address.service';
import { AddressController } from './address.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        PrismaModule,
        JwtModule.registerAsync({
            useFactory: ()=>({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRE
                }
            })
        }),
        UserModule,
        AuthModule
    ],
    controllers: [
        AddressController,],
    providers: [
        AddressService,
    ],
})
export class AddressModule { }
