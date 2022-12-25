import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from 'src/entities/profile/app.entity';
import { Common } from 'src/entities/profile/common.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dtos/createProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  async getProfileByEmail(
    profileDto: Omit<ProfileDto<App | Common>, 'profile'>
  ): Promise<Common | App> {
    const profileInfo = await this.profileRepository.findOne(profileDto);
    return profileInfo?.profile;
  }

  async createOrUpdateProfile(
    profileDto: ProfileDto<App | Common>
  ): Promise<Common | App> {
    const { profile, email, applicationName } = profileDto;

    const fetchedProfile = await this.getProfileByEmail({
      email,
      applicationName,
    });

    if (!fetchedProfile) {
      await this.profileRepository.save(profileDto);
    } else {
      await this.profileRepository.update(
        { email, applicationName },
        { profile }
      );
    }
    const updatedProfile = await this.getProfileByEmail({
      email,
      applicationName,
    });

    return updatedProfile;
  }
}
