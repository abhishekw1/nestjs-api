import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PdfModule } from './pdf/pdf.module';
import { MONGO_CONNECTION } from './constant';

@Module({
  imports: [UsersModule, PdfModule, MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class AppModule {}
