import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService
{

    constructor(private prisma: PrismaService)
    {
        
    }


    async create({name, email, message}:{name: string; email: string; message: string})
    {

        

    }
}
