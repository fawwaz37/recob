import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TabungService } from './tabung.service';
import { AddItemDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/user/entity';

@UseGuards(JwtGuard)
@Controller('tabung')
export class TabungController {
  constructor(private tabungService: TabungService) {}

  @Post()
  async addCart(@Body() dto: AddItemDto, @GetUser() user: User) {
    return await this.tabungService.addKeranjang(dto, user);
  }

  @Get()
  async listCartUser(@GetUser() user: User) {
    return this.tabungService.getUserCart(user);
  }

  @Put(':cart')
  async editCart(@Body() body: { quantity: number }, @Param('cart') id: number) {
    return this.tabungService.editCart(body.quantity, id);
  }

  @Delete(':cart')
  async deleteSampah(@Param('cart') cart_id: number) {
    return this.tabungService.deleteItem(cart_id);
  }
}
