import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FlagParser } from './lib/flag-parser';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nodeArguments = FlagParser.getFlags(process.argv);

  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('The Backend API description')
    .setVersion('1.2')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (nodeArguments.has('write-api-file')) {
    writeFileSync('./api.json', JSON.stringify(document));

    if (nodeArguments.has('exit-after-write-api-file')) {
      await app.close();
      process.exit(0);
    }
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
