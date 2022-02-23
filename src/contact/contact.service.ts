import { Injectable,BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService
{

    constructor(private prisma: PrismaService)
    { 
        
    }

    async get(id: number)
    {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('Não existe esse comentário')
        }

        return this.prisma.contact.findUnique({
            where: {
                id
            }
        });
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

        let personId: number;

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

            const person = await this.prisma.contact.findFirst({
                where: {
                    email
                }
            });

            if (person) {
                personId = Number(person.personId);
            } else {

                const newPerson = await this.prisma.person.create({
                    data: {
                        name
                    }
                });

                personId = Number(newPerson.id);

            }
            
        }

        return this.prisma.contact.create({
            data: {
                personId,
                email,
                message
            }
        })

    }

    async listAll()
    {
        return this.prisma.contact.findMany();
    }
    async list(email:string)
    {
        if (!email) {
            throw new BadRequestException("O e-mail é obrigatório");
        }

        return this.prisma.contact.findMany({
            where: {
                email
            }
        });
    }

    async delete(id: number)
    {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException("Não existe esse contato");
        }
        
        if (!await this.get(id)) {
            throw new NotFoundException("ID não existe");
        }

        return this.prisma.contact.delete({
            where: {
                id
            }
        });

    }
}
