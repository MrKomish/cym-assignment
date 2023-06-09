import { Post } from "../posts/post.entity";
import { Comment } from "../posts/comment.entity";
import { Feed } from "./feed.interface";

export interface FeedCommentDto {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface FeedPostDto {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  comments: FeedCommentDto[];
}

export class FeedDto {
  posts!: FeedPostDto[];
}

export function toFeedCommentDto(comment: Comment): FeedCommentDto {
  return {
    id: comment._id.toString(),
    authorId: comment.authorId.toString(),
    content: comment.content,
    createdAt: comment.createdAt.toISOString()
  };
}

export function toFeedPostDto(post: Post): FeedPostDto {
  return {
    id: post._id.toString(),
    authorId: post.authorId.toString(),
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    comments: post.comments.map((comment) => toFeedCommentDto(comment))
  };
}

export function toFeedDto(feed: Feed): FeedDto {
  return {
    posts: feed.posts.map(toFeedPostDto)
  };
}