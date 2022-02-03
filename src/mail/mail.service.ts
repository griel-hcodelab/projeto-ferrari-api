import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) {

        //Permitir acesso sem ssl
        process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

    }

    async send(
        {
            to,
            from,
            subject,
            template,
            data
        } : {
            to: string;
            from: string;
            subject: string;
            template: string;
            data: any;
        }
    ) {

        return this.mailerService.sendMail({
            to,
            from,
            subject,
            template,
            context: data
        });
        
    }

 }
