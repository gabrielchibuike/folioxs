export interface templateTypes {
  _id: string;
  profilePictureUrl: string;
  profileName: string;
  bio: string;
  socialHandle: [];
  links: [];
  bankDetails: [];
  templateImage: [];
}

export interface userTypes {
  title?: string;
  link?: string;
  userProfileImg?: string;
  userProfileName?: string;
  userBio?: string;
  userSocialHandle?: string;
}
