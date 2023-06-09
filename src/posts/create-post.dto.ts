import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { CreatePost } from "./create-post.interface"

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content!: string;
}

export function toCreatePost(userId: string, dto: CreatePostDto): CreatePost {
  return {
    authorId: userId,
    content: dto.content
  };
}