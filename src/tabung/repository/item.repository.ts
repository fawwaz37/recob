import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entity';
import { Item } from '../entity/item.entity';

@Injectable()
export class ItemRepository extends Repository<Item> {
  constructor(private dataSource: DataSource) {
    super(Item, dataSource.createEntityManager());
  }

  async createItem(item: Item): Promise<Item> {
    const create = this.create(item);
    return this.save(create);
  }
}
