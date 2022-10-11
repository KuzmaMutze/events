import { CommonProfile, commonProfileSchema } from './schemas';

export const defaultCommonProfile: CommonProfile = commonProfileSchema.parse(
  {}
);
