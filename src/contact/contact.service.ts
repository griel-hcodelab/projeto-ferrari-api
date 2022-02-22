import { Injectable,BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService
{

    constructor(private prisma: PrismaService)
    { 
        
    }


    async create({name, email, message}:{name: string, email: string; message: string})
    {

        if (!name) {
            throw new BadRequestException("O nome é obrigatório");
        }
        if (!email) {
            throw new BadRequestException("O e-mail é obrigatório");
        }
        if (!message) {
            throw new BadRequestException("A mensagem é obrigatório");
        }

        let personId;

        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                personId: true
            }
        });

        if (user) {
            personId = Number(user.personId);
        } else {
            const person = await this.prisma.person.create({
                data: {
                    name
                }
            });

            personId = Number(person.id);
        }

        return this.prisma.contact.create({
            data: {
                personId,
                email,
                message
            }
        })

    }
}
