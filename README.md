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

Register - POST /users
Get User - GET /users/:userId

Login - POST /auth/login (by username)

Create Post - POST /posts
Get Post - GET /posts/:postId
Update Post - PATCH /posts/:postId
Delete Post - DELETE /posts/:postId

Create Comment - POST /posts/:postId/comments

Get User Feed - GET /feed

Generally planned but didn't have time:

Get Sent Friend Requests: GET /sent-friend-requests
Get Sent Friend Request: GET /sent-friend-requests/:userId
Create Sent Friend Request: POST /sent-friend-requests/:userId

Get Received Friend Requests: GET /received-friend-requests
Accept Friend Request: POST /received-friend-requests/:userId/accept
Reject Friend Request: POST /received-friend-requests/:userId/reject

### DB

Read `user.entity.ts`, `post.entity.ts` and `comment.entity.ts`.

Generally planned but didn't have time:

FriendRequest {
	_id: ObjectId;
	fromUserId: ObjectId;
	toUserId: ObjectId;
	status: 'pending' | 'rejected' | 'accepted';
}