import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    ContactModule,
    MailModule,
    UserModule,
    PrismaModule,
    AuthModule
  ],
  controllers:
    [
      AppController
    ],
  providers: [],
})
export class AppModule { }
