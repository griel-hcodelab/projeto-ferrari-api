import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller("schedules")
export class ScheduleController
{
    constructor (private scheduleService: ScheduleService) {}

    @UseGuards(AuthGuard)
    @Get()
    async findAll()
    {
        return this.scheduleService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('my-schedules')
    async listByPerson(@User() user)
    {
        return this.scheduleService.findByPerson(user.personId);
    }


    @UseGuards(AuthGuard)
    @Post()
    async createSchedule(
        @User() user,
        @Body() data: CreateScheduleDto
    )
    {
        return this.scheduleService.create(user.personId, data);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async destroy(@Param('id', ParseIntPipe) id: number, @User() user)
    {
        return this.scheduleService.destroy(id, user.personId)
    }
}
