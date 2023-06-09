import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePost } from './create-post.interface';
import { Post } from './post.entity';
import { UsersService } from '../users/users.service';
import { UserNotFoundError } from '../users/user-not-found.error';
import { UpdatePost } from './update-post.interface';
import { PostNotFoundError } from './post-not-found.error';
import { FindPosts } from './find-posts.interface';
import { CreateComment } from './create-comment.interface';
import { Comment } from './comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private usersService: UsersService
  ) { }

  async create(createPost: CreatePost): Promise<Post> {
    const authorExists = this.usersService.get(createPost.authorId);
    if (!authorExists) {
      throw new UserNotFoundError('Author doesn\'t exist');
    }

    const post = new this.postModel({
      authorId: new Types.ObjectId(createPost.authorId),
      content: createPost.content
    });
    await post.save();

    return post;
  }

  async createComment(createComment: CreateComment): Promise<Comment> {
    // TODO replace by this.postModel.update for performance (not needing to get whole post)
    const post = await this.postModel.findById(createComment.postId);
    if (post == null) {
      throw new PostNotFoundError("Post doens\'t exist");
    }
    const comment = new Comment();
    comment.authorId = new Types.ObjectId(createComment.authorId);
    comment.content = createComment.content;
    post.comments.push(comment);
  }

  async find(findPosts: FindPosts): Promise<Post[]> {
    return await this.postModel.find({
      authorId: { 
        $nin: findPosts.userIdsBlacklist.map((id) => new Types.ObjectId(id)) 
      }
    })
      .sort({ createdAt: -1 })
      .skip(findPosts.skip)
      .limit(findPosts.limit)
      .exec();
  }

  async get(id: string): Promise<Post | null> {
    return await this.postModel.findById(id).exec();
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.postModel.count({ _id: new Types.ObjectId(id) }).exec();
    return count > 0;
  }

  async update(update: UpdatePost): Promise<void> {
    // TODO replace logic by findByIdAndUpdate error
    if (!this.exists(update.id)) {
      throw new PostNotFoundError('Post doesn\'t exist');
    }

    await this.postModel.findByIdAndUpdate(update.id, { content: update.content }).exec();
  }

  async delete(id: string): Promise<void> {
    // TODO replace logic by findByIdAndUpdate error
    if (!this.exists(id)) {
      throw new PostNotFoundError('Post doesn\'t exist');
    }

    await this.postModel.findByIdAndDelete(id).exec();
  }
}
