import * as mongoose from 'mongoose';
import {
  IsString,
  IsInt,
  IsMongoId,
  IsEmail,
  Min,
  Max,
  Length,
} from 'class-validator';

export class UserClass {
  @IsString()
  @IsMongoId()
  _id: string;

  @IsString({ always: true, message: 'name must be string' }) name: string;
  @IsEmail() email: string;

  @IsInt()
  @Min(0)
  @Max(10)
  phone: number;

  @IsString()
  @Length(10, 20)
  address: string;
}
export const UsersSchema = new mongoose.Schema(UserClass, {
  versionKey: false,
});
