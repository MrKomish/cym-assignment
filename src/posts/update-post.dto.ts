import {
  IsNotEmpty,
  IsString,
  IsMongoId,
} from 'class-validator';
import { UpdatePost } from "./update-post.interface"

export class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  content!: string;
}

export function toUpdatePost(id: string, authorId: string, dto: UpdatePostDto): UpdatePost {
  return {
    id,
    authorId: authorId,
    content: dto.content
  };
}