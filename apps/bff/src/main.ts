import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { getHttpsOptions } from './httpsOptions';
import { Env } from './utils/env.schema';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: getHttpsOptions(),
  });
  // app.use(cookieParser());
  const configService: ConfigService<Env> = app.get(ConfigService);

  await app.listen(configService.get('PORT') || 3333);
}

bootstrap();
