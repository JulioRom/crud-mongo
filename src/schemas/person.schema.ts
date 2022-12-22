import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonDocument = HydratedDocument<Person>;

@Schema()
export class Person {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  rut: number;

  @Prop({ default: Date.now })
  create_date: Date;

  @Prop({ default: Date.now })
  update_date: Date;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
