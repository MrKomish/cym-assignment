import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CommentSchema, Comment } from './comment.entity';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: { createdAt: 'created_at' }
})
export class Post {
  _id!: Types.ObjectId;
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId!: Types.ObjectId;

  @Prop()
  content!: string;

  @Prop({ type: [CommentSchema], default: [] })
  comments!: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);