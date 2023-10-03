import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('dashboard/index')
  getHello(@Res() res: Response) {
    // return this.appService.getHello();
    // return res.render('dashboard/uploadsampah', {
    //   layout: 'layouts/main',
    // });
    return res.render('dashboard/dashboard', {
      layout: 'layouts/main', // Properti layout
    });
    // return res.render('auth/login', {
    //   layout: 'auth/main',
    // });
  }
}
