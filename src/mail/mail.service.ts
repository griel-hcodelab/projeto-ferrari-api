import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

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

        try {

            return this.mailerService.sendMail({
                to,
                from,
                subject,
                template,
                context: data
            });

        } catch(e) {
            throw new BadRequestException(e.message);
        }
        
    }

 }
