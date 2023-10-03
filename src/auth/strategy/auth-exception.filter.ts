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
export class LocalAuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (exception instanceof UnauthorizedException) {
      request.flash('error_msg', 'Admin Not Found!');
      response.redirect('/auth/admin/signin');
    } else if (exception instanceof ForbiddenException) {
      request.flash('error_msg', 'Credential Admin Incorrect!');
      response.redirect('/auth/admin/signin');
    } else if (exception instanceof ConflictException) {
      request.flash('error_msg', 'Admin Already Registered Before!');
      response.redirect('/auth/admin/signup');
    } else {
      throw new InternalServerErrorException('Something Wrong!');
    }
  }
}
