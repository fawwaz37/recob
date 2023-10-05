import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IRequestFlash } from 'src/lib/flash.interface';

@Catch(HttpException)
export class AdminExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (exception instanceof ForbiddenException) {
      request.flash('error_msg', 'Credential Admin Incorrect!');
      return response.redirect('/auth/admin/signin');
    }
    console.log(exception);

    request.flash('error_msg', exception.message);
    return response.redirect(request.originalUrl);
  }
}
