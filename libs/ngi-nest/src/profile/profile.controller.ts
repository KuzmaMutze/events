import { Body, Controller, Get } from '@nestjs/common';
import { UserData } from '@ngi/common';
import { ProfileService } from './profile.service';

@Controller('/api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  //   @Get()
  //   getProfile(@Body() user: UserData) {
  //     return this.profileService.getAndUpgrade(user);
  //   }

  @Get('/default')
  getDefaultProfile(@Body() user: UserData) {
    return this.profileService.getDefault(user);
  }
}
