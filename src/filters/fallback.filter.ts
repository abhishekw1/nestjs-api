import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(),
      repsonse = ctx.getResponse();

    return repsonse.status(500).json({
      statusCode: 500,
      createdBy: 'FallbackExceptionFilter',
      errorMessage: exception.message
        ? exception.message
        : 'Unexpected error occured',
    });
  }
}
