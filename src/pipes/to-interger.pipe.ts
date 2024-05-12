import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string> {
  transform(value: string) {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException('conversion to number to faild' + value);
    }
    return val;
  }
}
