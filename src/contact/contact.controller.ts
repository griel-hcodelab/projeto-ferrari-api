import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post()
    async create(
        @Body('name') name,
        @Body('email') email,
        @Body('message') message,
    ) {
        return this.contactService.create({ name, message, email });
    }

    @Get()
    async listAll() {
        return this.contactService.listAll();
    }

    @Get()
    async list(@Query('email') email) {
        return this.contactService.list(email);
    }

    @Delete(':id')
    //@HttpCode(204)
    async destroy(@Param('id') id, @Res() response: Response) {
        await this.contactService.delete(Number(id));

        response.sendStatus(204);
    }
}
