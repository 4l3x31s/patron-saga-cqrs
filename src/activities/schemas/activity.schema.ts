import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
