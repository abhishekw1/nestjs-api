import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private usersModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return this.usersModel.find();
  }

  async getUsersById(id: string): Promise<User[]> {
    return this.usersModel.findOne({ _id: id });
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.usersModel(user, { versionKey: false });
    await newUser.save();
    return newUser.toObject({ versionKey: false });
  }

  async updateUser(id: string, updatedUser: Partial<User>): Promise<User> {
    return this.usersModel.findOneAndUpdate({ _id: id }, updatedUser, {
      new: true,
    });
  }

  async deleteUser(id: string) {
    return this.usersModel.deleteOne({ _id: id });
  }
}
