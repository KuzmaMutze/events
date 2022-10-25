import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { AuthClient, EventsClient } from '@integrations/events';
import { Env, envSchema } from './utils/env.schema';
import {
  AUTH_CLIENT,
  EVENTS_CLIENT,
  PROFILE_DEFAULT_PROVIDER,
} from './constants';
import { ProfileController } from './controllers/profile.controller';
import { ProfileModule, user, UserModule } from '@ngi/nest';
import { defaultUser } from '@events/user-profile';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV || 'development'}`],
      validate: (x) => envSchema.parse(x),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
      exclude: ['/api/*', '/health/*', '/auth/*'],
    }),
    ProfileModule.forRootAsync({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        return {
          applicationName: 'events',
          baseURL: configService.get('PROFILE_URL'),
        };
      },
    }),
  ],
  controllers: [ProfileController, UserController, AuthController],
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
    {
      provide: AUTH_CLIENT,
      useFactory: (configService: ConfigService) => {
        const baseURL = configService.get('EVENTS_API_URL');
        if (!baseURL) {
          throw new Error('EVENTS_API_URL is not provided');
        }
        console.log(`Using baseURL: ${baseURL}`);
        return new AuthClient(
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
    {
      provide: PROFILE_DEFAULT_PROVIDER,
      useValue: () => defaultUser,
    },
  ],
  exports: [EVENTS_CLIENT, AUTH_CLIENT, PROFILE_DEFAULT_PROVIDER],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer): void {
    // TODO: Add user @ngi/nest
    consumer
      .apply(
        user({ jwtSecret: this.configService.get('JWT__SECRET', 'secret') })
      )
      .exclude('/health/*')
      .forRoutes('*');
  }
}
