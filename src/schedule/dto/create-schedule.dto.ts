import { IsNotEmpty } from "class-Validator";

export class CreateScheduleDto
{

    @IsNotEmpty()
    timeOptionId: number;

    @IsNotEmpty()
    paymentSituationId: number;

    @IsNotEmpty()
    billingAddressId: number;

    @IsNotEmpty()
    scheduleAt: Date;

    @IsNotEmpty()
    total: number;

    @IsNotEmpty()
    installments: number;

    @IsNotEmpty()
    services: string;
}