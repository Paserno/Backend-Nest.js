import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SeedService {
 
  constructor(
    private readonly productsService :ProductsService,

    @InjectRepository( User )
    private readonly userRepository : Repository<User> 
  ) { }

  async runSeed(){

    await this.deleteTables();
    const adminUser = await this.inserUsers();
    
    await this.insertNewProduct(adminUser);
    return 'Run Seed';
  }

  private async deleteTables() {

    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async inserUsers() {

    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.map(({password, ...user}) => {
      users.push( this.userRepository.create({
        ...user,
        password: bcrypt.hashSync(password, 10),
      }));
      
    });

    const dbUsers = await this.userRepository.save(users);
    

    return dbUsers[0];
  }


  private async insertNewProduct( user: User ){
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromise = [];

    products.forEach(product => {
      insertPromise.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromise);

    return true;
  }
}
