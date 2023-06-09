import { User } from './user.entity';

export interface UserDto {
  id: string;
  username: string;
  email: string;
}

export function toUserDto(user: User): UserDto {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email
  };
}
