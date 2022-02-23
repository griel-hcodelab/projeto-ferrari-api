/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PaymentSituationController } from './paymentsituation.controller';
import { PaymentSituationService } from './paymentsituation.service';

@Module({
    imports: [PrismaModule],
    controllers: [PaymentSituationController],
    providers: [PaymentSituationService],
})
export class PaymentSituationModule {}
