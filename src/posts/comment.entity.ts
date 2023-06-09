import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
  timestamps: { createdAt: 'created_at' }
})
export class Comment {
  _id!: Types.ObjectId;
  createdAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId!: Types.ObjectId;

  @Prop()
  content!: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);