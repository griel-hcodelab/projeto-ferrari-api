import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validation-number';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
    constructor(private prisma: PrismaService) {}

    isValidData(data: CreateServiceDto | UpdateServiceDto) {
        if (!data.name) {
            throw new BadRequestException('Name is required');
        }

        if (!data.description) {
            throw new BadRequestException('Description is required');
        }

        if (!data.price) {
            throw new BadRequestException('Price is required');
        }

        return data as CreateServiceDto;
    }

    async create(data: CreateServiceDto) {
        return this.prisma.service.create({
            data: this.isValidData(data),
        });
    }

    async findAll() {
        return this.prisma.service.findMany();
    }

    async findOne(id: number) {
        return this.prisma.service.findUnique({
            where: {
                id: isValidNumber(id),
            },
        });
    }

    async update(id: number, data: UpdateServiceDto) {
        return this.prisma.service.update({
            where: {
                id: isValidNumber(id),
            },
            data: this.isValidData(data),
        });
    }

    async remove(id: number) {
        if (!(await this.findOne(id))) {
            throw new NotFoundException('ID not found');
        }

        return this.prisma.service.delete({
            where: {
                id: isValidNumber(id),
            },
        });
    }
}
