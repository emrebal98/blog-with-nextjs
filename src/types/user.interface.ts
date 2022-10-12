export interface User {
  name: string;
  username: string;
  profile_image_90: string;
}

export interface UserResponse extends User {
  twitter_username: string | null;
  github_username: string | null;
  user_id: number;
  website_url: string | null;
  profile_image: string;
}
