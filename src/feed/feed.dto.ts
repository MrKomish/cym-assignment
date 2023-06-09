import { Post } from "../posts/post.entity";
import { Feed } from "./feed.interface";

export interface FeedPostDto {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export class FeedDto {
  posts!: FeedPostDto[];
}

export function toFeedPostDto(post: Post): FeedPostDto {
  return {
    id: post._id.toString(),
    authorId: post.authorId.toString(),
    content: post.content,
    createdAt: post.createdAt.toISOString()
  };
}

export function toFeedDto(feed: Feed): FeedDto {
  return {
    posts: feed.posts.map(toFeedPostDto)
  };
}