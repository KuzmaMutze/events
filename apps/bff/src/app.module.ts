import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { EventsClient } from '@integrations/events';
import { envSchema } from './utils/env.schema';
import { EVENTS_CLIENT } from './constants';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV || 'development'}`],
      validate: (x) => envSchema.parse(x),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/*', '/health/*', '/auth/*'],
    }),
  ],
  controllers: [ProfileController],
  providers: [
    {
      provide: EVENTS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const baseURL = configService.get('EVENTS_API_URL');
        if (!baseURL) {
          throw new Error('EVENTS_API_URL is not provided');
        }
        console.log(`Using baseURL: ${baseURL}`);
        return new EventsClient(
          {
            maxBodyLength: 50 * 1024 * 1024,
            baseURL,
            paramsSerializer: (params) => {
              const query = new URLSearchParams();
              Object.keys(params).forEach((key) => {
                const value = params[key];
                if (Array.isArray(value)) {
                  value.forEach((v) => query.append(key, v));
                } else {
                  query.append(key, value);
                }
              });
              return query.toString();
            },
          },
          true
        );
      },
      inject: [ConfigService],
    },
  ],
  exports: [EVENTS_CLIENT],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer): void {
    // TODO: Add user @ngi/nest
    consumer.apply().exclude('/health/*').forRoutes('*');
  }
}
