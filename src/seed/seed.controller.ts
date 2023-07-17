import { Controller, Get} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';

import { SeedService } from './seed.service';



@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth( ValidRoles.admin )
  @ApiResponse({ status: 200, description: 'Run Seed'})
  executeSeed() {
    return this.seedService.runSeed();

  }
}
