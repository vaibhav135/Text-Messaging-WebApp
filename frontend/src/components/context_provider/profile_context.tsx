import { createContext } from "react";

export type userProfileHookType = {
  userId: string;
  username: string;
  profile_name: string;
  description: string;
  gender: string;
  image: string;
  hobbies: string[];
  social_media: {
    facebook: string;
    instagram: string;
    github: string;
  };
};

const defaultUserData = {
  userProfileHook: {
    userId: "",
    username: "",
    profile_name: "",
    description: "",
    gender: "",
    image: "",
    hobbies: [],
    social_media: {
      facebook: "",
      instagram: "",
      github: "",
    },
  },
  setUserProfileHook: (userProfileHook: userProfileHookType) => {},
  skip: false,
  setSkip: (skip: boolean) => {},
};

export const ProfileContext = createContext(defaultUserData);
