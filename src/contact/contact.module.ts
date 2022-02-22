import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [
        ContactController,
    ],
    providers: [
        ContactService,
        PrismaService
    ],
})
export class ContactModule { }
