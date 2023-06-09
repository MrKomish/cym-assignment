import { IsNumber, IsPositive } from "class-validator";

export class GetFeedDto {
  @IsNumber()
  @IsPositive()
  skip!: number;

  @IsNumber()
  @IsPositive()
  limit!: number;
}

export function toGetFeed(userId: string, dto: GetFeedDto) {
  return {
    userId: userId,
    skip: dto.skip,
    limit: dto.limit
  }
}