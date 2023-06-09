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

export function toUpdatePost(id: string, dto: UpdatePostDto): UpdatePost {
  return {
    id,
    content: dto.content
  };
}