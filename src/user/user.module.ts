import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';
import { PasswordService } from './password.service';

@Module({
    imports: [
        PrismaModule,
        MailModule,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        PrismaService,
        PasswordService,
    ],
    exports: [
        UserService,
        PasswordService,
    ]
})
export class UserModule { }
 