import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [
        UserController,],
    providers: [
        UserService,
        PrismaService
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
