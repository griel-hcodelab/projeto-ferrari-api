import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleGateway } from './schedule.gateway';

@Injectable()
export class ScheduleService {

    constructor(private prisma: PrismaService, private socket: ScheduleGateway) {}

    async isValidPerson(id, personId)
    {
        personId = isValidNumber(personId);

        const schedule = await this.findOne(isValidNumber(id));

        if (schedule.personId !== personId) {
            throw new BadRequestException("Não é possível apagar")
        }

        return true;
    }

    async findOne(id: number)
    {
        return this.prisma.schedule.findUnique({
            where: {
                id: isValidNumber(id)
            }
        });
    }

    async findAll() {

        return this.prisma.schedule.findMany();

    }

    async findByPerson(id: number)
    {

        return this.prisma.schedule.findMany({
            where: {
                personId: isValidNumber(id)
            }
        });

    }

    async create(personId: number, {
        timeOptionId,
        billingAddressId,
        paymentSituationId,
        scheduleAt,
        total,
        installments,
        services,
    }: CreateScheduleDto) {

        scheduleAt = new Date(scheduleAt);

        timeOptionId = isValidNumber(timeOptionId);
        billingAddressId = isValidNumber(billingAddressId);

        const timeOption = await this.prisma.timeOptions.findUnique({
            where: {
                id: timeOptionId
            }
        });

        if (!timeOption) {
            throw new NotFoundException("Esse horário é inválido");
        }

        const address = await this.prisma.address.findUnique({
            where: {
                id: billingAddressId
            }
        });

        if (!address) {
            throw new NotFoundException("Esse endereço é inválido");
        }

        const currentScheduleAt = await this.prisma.schedule.findFirst({
            where: {
                scheduleAt
            }
        });

        if (currentScheduleAt) {
            throw new BadRequestException("Esse horário não está disponível")
        }

        const schedule = await this.prisma.schedule.create({
            data: {
                timeOptionId: timeOptionId,
                billingAddressId: isValidNumber(billingAddressId),
                paymentSituationId: isValidNumber(paymentSituationId),
                scheduleAt,
                total: isValidNumber(total),
                installments: isValidNumber(installments),
                personId: isValidNumber(personId),
            },
        });

        if (schedule) {

            services.split(",").forEach(async (item) => {

                await this.prisma.scheduleService.create({
                    data: {
                        scheduleId: schedule.id,
                        serviceId: +item,
                    },     
                });

            });

        }

        this.socket.created(schedule);

        return schedule;

    }

    async destroy(id: number, personId: number)
    {
        await this.isValidPerson(id, personId);

        return this.prisma.schedule.delete({
            where: {
                id: isValidNumber(id)
            }
        });
    }

}