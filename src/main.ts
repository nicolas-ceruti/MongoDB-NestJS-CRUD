import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const rabbitMqService = app.get(RabbitMqService);
    await rabbitMqService.init();
  } catch (ex) {
    console.log("Unable to connect to rabbitMQ")
  }

  await app.listen(3000);
}
bootstrap();
