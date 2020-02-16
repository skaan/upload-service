import { Controller, Get } from '@nestjs/common';
import pjson from '../package.json';
@Controller()
export class AppController {
  @Get()
  getVersion(): string {
    return pjson.version;
  }
}
