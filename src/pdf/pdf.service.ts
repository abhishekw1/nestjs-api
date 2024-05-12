import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { db } from 'src/db/db';
import { User } from 'src/model/user.model';

@Injectable()
export class PdfService {
  private db: User[] = db;

  generatePdf(): string {
    const filePath = 'src/db/pdf/users.pdf';

    const doc = new PDFDocument();
    doc.fontSize(12);
    db.forEach((user) => {
      doc.text(`Id: ${user._id}`);
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
