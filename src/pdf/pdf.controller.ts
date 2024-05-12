import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('/api/users-generatepdf')
  generatePdf(): { path: string } {
    const path = this.pdfService.generatePdf();
    return { path: path };
  }

  @Get('/api/users-retrieve')
  async retrievePdf(@Res() res: Response): Promise<void> {
    const filePath = 'src/pdf/users.pdf';

    const fileStream = this.pdfService.retrievePdf(filePath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');

    fileStream.pipe(res);
  }
}
