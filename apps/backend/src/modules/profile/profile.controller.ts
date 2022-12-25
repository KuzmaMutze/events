import { Body, Controller, Query, Param, Post, Get } from '@nestjs/common';
import { App } from 'src/entities/profile/app.entity';
import { Common } from 'src/entities/profile/common.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfileByEmail(
    @Query('email') email: string,
    @Query('applicationName') applicationName: string
  ): Promise<Common | App> {
    return await this.profileService.getProfileByEmail({
      email,
      applicationName,
    });
  }

  @Post()
  async createOrUpdateProfile(
    @Body() profile: App | Common,
    @Query('email') email: string,
    @Query('applicationName') applicationName: string
  ): Promise<Common | App> {
    return await this.profileService.createOrUpdateProfile({
      profile,
      email,
      applicationName,
    });
  }
}
