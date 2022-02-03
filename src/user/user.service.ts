/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { isThursday } from 'date-fns';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {


    constructor(private prisma: PrismaService, private mailService: MailService)
    {

    }

    async get(id: number, hash = false)
    {
    
        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is required.');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                person: true
            }
        });

        if (!user) {
            throw new NotFoundException('The user was not found.')
        }

        if (!hash) {
            delete user.password;
        }

        return user;
    }

    async getByEmail(email: string)
    {
    
        if (!email) {
            throw new BadRequestException('E-Mail is required.');
        }

        const user = await this.prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                person: true
            }
        });

        if (!user) {
            throw new NotFoundException('The user was not found.')
        }

        delete user.password;

        return user;
    }

    async create({
        name, 
        email, 
        birthAt, 
        phone, 
        document,
        password
    }:{
        name: string; 
        email: string; 
        password: string;
        birthAt?: Date; 
        phone?: string; 
        document?: string;
    })
    {

        if (!name) {
            throw new BadRequestException('Name is required.')
        }
        if (!email) {
            throw new BadRequestException('Email is required.')
        }
        if (!password) {
            throw new BadRequestException('Password is required.')
        }
        if (birthAt && birthAt.toString().toLowerCase() === 'invalid date') {
            throw new BadRequestException('Birth date is invalid.')
        }

        let user = null;

        try {
            
            user = await this.getByEmail(email);
            
        } catch (error) {

            
        }

        if (user) {
            throw new BadRequestException('Email already exists')
        }

        const userCreated = await this.prisma.user.create({
            data: {
                person: {
                    create: {
                        name, birthAt, document, phone
                    }
                },
                email,
                password: bcrypt.hashSync(password, 10)
            },
            include: {
                person: true
            }
        });

        delete userCreated.password;

        return userCreated;

    }

    async update(id: number, {
        name, 
        email, 
        birthAt, 
        phone, 
        document
    }:{
        name?: string; 
        email?: string; 
        birthAt?: Date; 
        phone?: string; 
        document?: string;
    })
    {

        id = Number(id);

        if (isNaN(id)) {
            throw new BadRequestException('ID is incorrect');
        }

        const dataPerson = {} as Prisma.PersonUpdateInput;

        const dataUser = {} as Prisma.UserUpdateInput;

        if (name) {
            dataPerson.name = name;
        }
        if (birthAt) {
            dataPerson.birthAt = birthAt;
        }
        if (phone) {
            dataPerson.phone = phone;
        }
        if (document) {
            dataPerson.document = document;
        }

        if (email) {
            dataUser.email = email;
        }

        const user = await this.get(id);

        if (dataPerson) {
            await this.prisma.person.update({
                where: {
                    id: user.personId,
                },
                data: dataPerson
            });
        }

        if (dataUser) {
            await this.prisma.user.update({
                where: {
                    id,
                },
                data: dataUser
            });
        }

        return this.get(id);

    }

    async checkPassword(userId: number, password: string)
    {
        const user = await this.get(userId, true);

        const checked = await bcrypt.compare(password, user.password);

        if (!checked) {
            throw new UnauthorizedException("Email or password is incorrect");
        }

        return true;

    }

    async updatePassword(id: number, password: string)
    {

        const user = await this.get(id);

        const userUpdated = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password: bcrypt.hashSync(password, 10)
            },
            include: {
                person: true
            }
        });

        delete userUpdated.password;

        await this.mailService.send({
            to: user.email,
            subject: 'Senha Alterada com Sucesso',
            from: 'miguel@griel.com.br',
            template: 'reset-password-confirm',
            data: {
                name: userUpdated.person.name
            }
        });

        return userUpdated;

    }

    async changePassword(id: number, currentPassword: string, newPassword: string)
    {
        if (!newPassword) {
            throw new BadRequestException('New password is required');
        }
        
        await this.checkPassword(id, currentPassword);

        return this.updatePassword(id, newPassword);


    }

}
