import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { ProfileService, PROFILE_OPTIONS } from '.';

export interface ProfileModuleOptions {
  baseURL: string;
  applicationName: string;
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
          new AppProfileClient(
            {
              baseURL: options.baseURL,
            },
            {
              enableLogs: true,
            }
          ),
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
