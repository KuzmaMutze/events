import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfileEntity } from 'src/entities/profile.entity';
import { CreateProfileInput } from './inputs/create.profile.input';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // @Get()
  // async getProfile(): Promise<ProfileEntity[]> {
  //   return await this.profileService.getAllProfiles();
  // }

  @Post()
  async createOrUpdateProfile(
    @Body() updateProfileInput: CreateProfileInput
  ): Promise<ProfileEntity> {
    return await this.profileService.createOrUpdateProfile(updateProfileInput);
  }
}
