## Installation

```bash
$ npm install
```

## Setup

Create `.env` file from `.env.example`. Then update the `MONGODB_CONNECTION_STRING` param.

## Running the app

```bash
# development
$ npm run start
```
## Design

No transactions present, would do one of 2 in a real app:
a. Add transactions / make sure everything is atomic.
b. Design an eventually-consistent architecture.

### API

```
Register - POST /users
Get User - GET /users/:userId

Login - POST /auth/login (by username)

Create Post - POST /posts <br>
Get Post - GET /posts/:postId <br>
Update Post - PATCH /posts/:postId <br>
Delete Post - DELETE /posts/:postId <br>

Create Comment - POST /posts/:postId/comments

Get User Feed - GET /feed

Generally planned but didn't have time:

Get Sent Friend Requests: GET /sent-friend-requests <br>
Get Sent Friend Request: GET /sent-friend-requests/:userId <br>
Create Sent Friend Request: POST /sent-friend-requests/:userId <br>

Get Received Friend Requests: GET /received-friend-requests <br>
Accept Friend Request: POST /received-friend-requests/:userId/accept <br>
Reject Friend Request: POST /received-friend-requests/:userId/reject <br>
```

### DB

Read `user.entity.ts`, `post.entity.ts` and `comment.entity.ts`.

Generally planned but didn't have time:

```typescript
interface FriendRequest {
  _id: ObjectId;
  createdAt: Date;

  fromUserId: ObjectId;
  toUserId: ObjectId;
  status: 'pending' | 'rejected' | 'accepted';
}
```