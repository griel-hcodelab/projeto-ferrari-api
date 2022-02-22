/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService
{

    constructor (
        private userService: UserService,
        private mailService: MailService,
        private prisma: PrismaService,
    ) {}


    async checkPassword(userId: number, password: string)
    {
        const user = await this.userService.get(userId, true);

        const checked = await bcrypt.compare(password, user.password);

        if (!checked) {
            throw new UnauthorizedException("Email or password is incorrect");
        }

        return true;

    }

    async updatePassword(id: number, password: string)
    {

        const user = await this.userService.get(id);

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
