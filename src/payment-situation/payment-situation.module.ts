import { Module } from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';
import { PaymentSituationController } from './payment-situation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        PrismaModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRE,
                },
            }),
        }),
        UserModule,
        AuthModule,
    ],
    controllers: [PaymentSituationController],
    providers: [PaymentSituationService],
})
export class PaymentSituationModule {}
