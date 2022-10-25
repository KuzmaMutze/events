import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserData } from '@ngi/common';
import { User } from '../user';
import { ProfileService } from './profile.service';

@Controller('/api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/default')
  getDefaultProfile(@Body() user: UserData) {
    return this.profileService.getDefault(user);
  }

  @Post('/upgrade')
  getProfile(@User() user: UserData) {
    return user;
    // return this.profileService.upgrade(user);
  }
}
