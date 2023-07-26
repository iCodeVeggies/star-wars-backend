import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  episodes: string[];

  @Prop()
  planet?: string;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
