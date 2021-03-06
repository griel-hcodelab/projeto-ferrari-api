import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: 'http://localhost:3001',
        credentials: true,
    });

    await app.listen(3000);
}
bootstrap();
