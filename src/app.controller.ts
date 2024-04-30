import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './model/user.model';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers(): User[] {
    return this.appService.getAllUsers();
  }

  @Post()
  createUser(@Body() user: User): User {
    return this.appService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: User): User {
    return this.appService.updateUser(Number(id), updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): User {
    return this.appService.deleteUser(Number(id));
  }

  @Get('generatepdf')
  generatePdf(): { path: string } {
    const path = this.appService.generatePdf();
    return { path: path };
  }

  @Get('retrieve')
  async retrievePdf(@Res() res: Response): Promise<void> {
    const filePath = 'src/pdf/users.pdf';

    const fileStream = this.appService.retrievePdf(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

    fileStream.pipe(res);
  }
}
