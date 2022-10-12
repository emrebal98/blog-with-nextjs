import { User, UserResponse } from '.';

export interface Post {
  id: number;
  title: string;
  description: string;
  published_timestamp: string;
  cover_image: string | null;
  reading_time_minutes: number;
  user: User;
  body_html: string | null;
}

export interface PostResponse extends Post {
  type_of: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number;
  positive_reactions_count: number;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  tag_list: string[];
  tags: string;
  user: UserResponse;
  body_markdown: string | null;
}
