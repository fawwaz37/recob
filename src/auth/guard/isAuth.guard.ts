import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { IRequestFlash } from 'src/lib/flash.interface';

@Injectable()
export class AdminLoginRedirectMiddleware implements NestMiddleware {
  use(req: IRequestFlash, res: Response, next: Function) {
    if (req.isAuthenticated()) {
      req.flash('error_msg', 'Anda Sudah Login Sebelumnya !');
      return res.redirect('/admin/dashboard');
    }

    next();
  }
}
