import {
  Body,
  Controller,
  Get
} from '@nestjs/common';
import { FeedDto, toFeedDto } from './feed.dto';
import { FeedService } from './feed.service';
import { GetUser } from '../auth/get-user.decorator';
import { LoggedInUser } from '../auth/logged-in-user.interface';
import { GetFeedDto, toGetFeed } from './get-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) { }

  @Get()
  async get(
    @GetUser() user: LoggedInUser,
    @Body() getFeed: GetFeedDto
  ): Promise<FeedDto> {
    const feed = await this.feedService.get(
      toGetFeed(user.id, getFeed)
    );
    return toFeedDto(feed);
  }
}
