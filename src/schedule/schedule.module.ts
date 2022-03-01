import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ScheduleGateway } from './schedule.gateway';

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
        ScheduleController,],
    providers: [
        ScheduleService,
        ScheduleGateway],
})
export class ScheduleModule { }
