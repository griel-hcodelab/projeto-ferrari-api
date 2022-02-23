import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionService
{

    constructor(private prisma: PrismaService) {}

    async listTimeOptions()
    {

        return this.prisma.timeOptions.findMany();

    }


    async createTimeOption({day, time}:{day: number; time: string})
    {

        day = Number(day);


        if (isNaN(day) || day < 0 || day > 6) {
            throw new BadRequestException("O dia é obrigatório");
        }
        if (!time) {
            throw new BadRequestException("A hora é obrigatória");
        }

        const splittedTime = time.split(':');

        if (splittedTime.length !== 2) {
            throw new BadRequestException("A hora está inválida");
        }

        const hours = Number(splittedTime[0]);
        const minutes = Number(splittedTime[1]);

        if (isNaN(hours) || hours < 0 || hours > 23) {
            throw new BadRequestException("A hora está inválida");
        }
        if (isNaN(minutes) || minutes < 0 || minutes > 59) {
            throw new BadRequestException("A hora está inválida");
        }

        const timeDate = new Date();

        timeDate.setHours(hours, minutes, 0)

        return this.prisma.timeOptions.create({
            data: {
                day,
                time: timeDate
            }
        });

    }

}
