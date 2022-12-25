import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { Profile, UserData } from '@ngi/common';
import { User } from '../user';
import { ProfileService } from './profile.service';

@Controller('/api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  getProfile(@User() user: UserData) {
    return this.profileService.getAndUpgrade(user);
  }

  @Get('/default')
  getDefaultProfile(@Body() user: UserData) {
    return this.profileService.getDefault(user);
  }

  @Put()
  async putProfile(@User() user: UserData, @Body() body: Profile<any, any>) {
    const validationResult = await this.profileService.validate(user, body);

    if (validationResult.isValid && validationResult.isLatest) {
      return this.profileService.save(user, body);
    }

    throw new BadRequestException('Trying to save an invalid or stale profile');
  }

  @Post('/upgrade')
  async upgradeUserProfile(
    @User() user: UserData,
    @Body() userProfile: Profile<any, any>
  ) {
    const up = await this.profileService.upgrade(user, userProfile ?? {});

    return up;
  }
}
