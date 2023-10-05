import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequestFlash } from './flash.interface';

@Injectable()
export class MyLocalsMiddleware implements NestMiddleware {
  use(req: IRequestFlash, res: Response, next: NextFunction) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.url = req.originalUrl;
    next();
  }
}
