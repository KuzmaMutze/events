import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './inputs/create.profile.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>
  ) {}

  async createOrUpdateProfile(
    profileInput: CreateProfileInput
  ): Promise<ProfileEntity> {
    const { username, state } = profileInput;
    const profile = this.profileRepository.findOne({ username });
    if (!profile) {
      return await this.profileRepository.save({ ...profileInput });
    } else {
      await this.profileRepository.update({ username }, { state });
    }

    return await this.profileRepository.findOne({ username });
  }
}
