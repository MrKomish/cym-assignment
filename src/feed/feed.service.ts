import { Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { GetFeed } from './get-feed.interface';
import { Feed } from './feed.interface';

@Injectable()
export class FeedService {
  constructor(
    private postsService: PostsService
  ) { }

  async get(
    getFeed: GetFeed
  ): Promise<Feed> {
    const posts = await this.postsService.find({
      limit: getFeed.limit,
      skip: getFeed.skip,
      userIdsBlacklist: [getFeed.userId]
    });

    return {posts};
  }
}
