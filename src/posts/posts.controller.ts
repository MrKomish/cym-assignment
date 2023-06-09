import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  BadRequestException,
  Param,
  Patch,
  Post as _Post,
} from '@nestjs/common';

import { PostDto, toPostDto } from './post.dto';
import { CreatePostDto, toCreatePost } from './create-post.dto';
import { NotUserPostError, PostsService } from './posts.service';
import { LoggedInUser } from '../auth/logged-in-user.interface';
import { GetUser } from '../auth/get-user.decorator';
import { UpdatePostDto, toUpdatePost } from './update-post.dto';
import { PostNotFoundError } from './post-not-found.error';
import { CommentDto, toCommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { toCreateComment } from './create-comment.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @_Post()
  async create(
    @GetUser() user: LoggedInUser,
    @Body() createDto: CreatePostDto
  ): Promise<PostDto> {
    const post = await this.postsService.create(
      toCreatePost(user.id, createDto)
    );

    return toPostDto(post);
  }

  @_Post(":postId/comments")
  async createComment(
    @GetUser() user: LoggedInUser,
    @Param('postId') postId: string, // TODO turn to dto with validator for userId (should be mongodb id)
    @Body() createDto: CreatePostDto
  ): Promise<CommentDto> {
    let comment: Comment;
    try {
      comment = await this.postsService.createComment(
        toCreateComment(user.id, postId, createDto)
      );
    } catch (err: any) {
      if (err instanceof PostNotFoundError) {
        throw new NotFoundException("Post not found");
      }
      throw err;
    }
    return toCommentDto(comment);
  }

  @Get(":postId")
  async get(
    @Param('postId') postId: string // TODO turn to dto with validator for userId (should be mongodb id)
  ): Promise<PostDto> {
    const post = await this.postsService.get(postId);
    if (post == null) {
      throw new NotFoundException("Post not found");
    }
    return toPostDto(post);
  }

  @Patch(":postId")
  async update(
    @GetUser() user: LoggedInUser,
    @Param('postId') postId: string, // TODO turn to dto with validator for userId (should be mongodb id)
    @Body() updateDto: UpdatePostDto
  ): Promise<void> {
    try {
      await this.postsService.update(
        toUpdatePost(postId, user.id, updateDto)
      );
    } catch (err: any) {
      if (err instanceof PostNotFoundError) {
        throw new NotFoundException("Post not found");
      }
      if (err instanceof NotUserPostError) {
        throw new BadRequestException("Post doens't belong to the user");
      }
      throw err;
    }
  }

  @Delete(":postId")
  async delete(
    @Param('postId') postId: string // TODO turn to dto with validator for userId (should be mongodb id)
  ): Promise<void> {
    try {
      await this.postsService.delete(postId);
    } catch (err: any) {
      if (err instanceof PostNotFoundError) {
        throw new NotFoundException("Post not found");
      }
      throw err;
    }
  }
}
