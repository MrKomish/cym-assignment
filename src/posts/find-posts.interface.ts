export interface FindPosts {
  skip: number;
  limit: number;
  userIdsBlacklist: string[];
}