import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';


@Injectable()
export class SeedService {
 
  constructor(
    private readonly productService :ProductsService
  ) { }

  async runSeed(){

    await this.insertNewProduct();
    return 'Run Seed';
  }

  private async insertNewProduct(){
    await this.productService.deleteAllProducts();

    return true;
  }
}
