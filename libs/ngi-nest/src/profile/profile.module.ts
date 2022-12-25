import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { AppProfileClient } from '@integrations/events';
import { ProfileController } from './profile.controller';
import { PROFILE_OPTIONS, PROFILE_CLIENT } from './constants';
import { ProfileService } from './profile.service';
import { Migrations, SchemaVersions } from '@ngi/common';

export interface ProfileModuleOptions {
  baseURL: string;
  applicationName: string;

  schemaVersions: SchemaVersions;
  migration: Migrations;
}

export interface ProfileModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports' | 'exports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<ProfileModuleOptions> | ProfileModuleOptions;
  inject?: any[];
}

@Module({})
export class ProfileModule {
  static forRoot(options: ProfileModuleOptions): DynamicModule {
    common.providers?.push(
      {
        provide: PROFILE_OPTIONS,
        useValue: options,
      },
      {
        provide: PROFILE_CLIENT,
        useFactory: (options: ProfileModuleOptions) =>
          new AppProfileClient({
            baseURL: options.baseURL,
          }),
        inject: [PROFILE_OPTIONS],
      }
    );
    return common;
  }
  static forRootAsync(options: ProfileModuleAsyncOptions): DynamicModule {
    common.imports = options.imports;
    common.providers?.push(
      {
        provide: PROFILE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject ?? [],
      },
      {
        provide: PROFILE_CLIENT,
        useFactory: (options: ProfileModuleOptions) =>
          new AppProfileClient({
            baseURL: options.baseURL,
          }),
        inject: [PROFILE_OPTIONS],
      }
    );
    common.exports = [...(common.exports ?? []), ...(options.exports ?? [])];
    return common;
  }
}

const common: DynamicModule = {
  module: ProfileModule,
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [PROFILE_CLIENT],
};
