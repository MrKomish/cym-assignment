import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CreateComment } from "./create-comment.interface"

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content!: string;
}

export function toCreateComment(authorId: string, postId: string, dto: CreateCommentDto): CreateComment {
  return {
    authorId,
    postId,
    content: dto.content
  };
}