import { CommentDto, toCommentDto } from './comment.dto';
import { Post } from './post.entity';

export interface PostDto {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  comments: CommentDto[];
}

export function toPostDto(post: Post): PostDto {
  return {
    id: post._id.toString(),
    authorId: post.authorId.toString(),
    content: post.content,
    createdAt: post.createdAt.toISOString(),
    comments: post.comments.map((comment) => toCommentDto(comment)) // TODO replace by seperate api with pagination to get comments
  };
}
