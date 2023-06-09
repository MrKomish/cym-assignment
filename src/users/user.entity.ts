import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id!: Types.ObjectId;
  
  @Prop({ unique: true })
  email!: string;

  @Prop({ unique: true })
  username!: string;

  @Prop()
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
