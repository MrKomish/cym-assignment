import { Comment } from "./comment.entity";

export interface CommentDto {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export function toCommentDto(comment: Comment): CommentDto {
  return {
    id: comment._id.toString(),
    authorId: comment.authorId.toString(),
    content: comment.content,
    createdAt: comment.createdAt.toISOString()
  };
}