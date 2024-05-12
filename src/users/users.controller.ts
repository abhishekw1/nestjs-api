import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UseFilters,
} from '@nestjs/common';
import { User } from '../model/user.model';
import { UsersService } from './users.service';
import { ParseIntPipe } from 'src/pipes/to-interger.pipe';
// import { HttpExceptionFilter } from 'src/http.filter';

@Controller()
// @UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/api/users')
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/api/users/:id')
  async getUsersById(@Param('id') id: string): Promise<User[]> {
    return this.userService.getUsersById(id);
  }

  @Post('/api/users')
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('/api/users/:id')
  // @UseFilters(new HttpExceptionFilter())
  async updateUser(
    @Param('id') id: string,
    @Body('phone', ParseIntPipe) phone: number,
    @Body()
    updatedUser: Partial<User>,
  ): Promise<User> {
    console.log('Phone -', typeof phone);
    if (updatedUser._id) {
      throw new BadRequestException("Can't update course id");
    }

    return this.userService.updateUser(id, updatedUser);
  }

  @Delete('/api/users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
