import { ProfileDTO } from "./ProfileDTO";

export default class ProfileMapper {
  static toDTO(profile: any): ProfileDTO {
    const profileDTO: ProfileDTO = {
      bio: profile.dataValues.bio,
      bucket_list: profile.dataValues.bucket_list,
      location: profile.dataValues.location,
      places_visited: profile.dataValues.places_visited,
    };
    return profileDTO;
  }
}
