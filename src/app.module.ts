import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PasswordService } from './user/password.service';

@Module({
  imports: [
    MailModule,
    UserModule,
    PrismaModule,
    AuthModule,
    PasswordService
  ],
  controllers:
    [
      AppController
    ],
  providers: [],
})
export class AppModule { }
