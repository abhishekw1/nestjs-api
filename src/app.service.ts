import { Injectable } from '@nestjs/common';
import { db } from './db';
import { User } from './model/user.model';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private db: User[] = db;

  getAllUsers(): User[] {
    return this.db;
  }

  createUser(user: User): User {
    user.id = this.db.length + 1;
    this.db.push(user);
    return user;
  }

  updateUser(id: number, updatedUser: User): User {
    const index = this.db.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.db[index] = { ...this.db[index], ...updatedUser };
      return this.db[index];
    }
    return null;
  }

  deleteUser(id: number): User {
    const index = this.db.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = this.db[index];
      this.db.splice(index, 1);
      return deletedUser;
    }
    return null;
  }
  generatePdf(): string {
    const filePath = 'src/pdf/users.pdf';

    const doc = new PDFDocument();
    doc.fontSize(12);
    db.forEach((user) => {
      doc.text(`ID: ${user.id}`);
      doc.text(`Name: ${user.name}`);
      doc.text(`Email: ${user.email}`);
      doc.text(`Phone: ${user.phone}`);
      doc.text(`Address: ${user.address}`);
      doc.moveDown();
    });

    doc.end();
    doc.pipe(fs.createWriteStream(filePath));
    return filePath;
  }
  retrievePdf(filePath: string): fs.ReadStream {
    return fs.createReadStream(filePath);
  }
}
