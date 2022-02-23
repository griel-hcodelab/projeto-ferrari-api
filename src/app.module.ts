import { AddressModule } from './address/address.module';
import { TimeOptionModule } from './time-option/time-option.module';
import { ContactModule } from './contact/contact.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    AddressModule,
    TimeOptionModule,
    ContactModule,
    MailModule,
    UserModule,
    PrismaModule,
    AuthModule,
    ServiceModule
  ],
  controllers:
    [
      AppController
    ],
  providers: [],
})
export class AppModule { }
