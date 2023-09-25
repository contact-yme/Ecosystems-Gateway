import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiExcludeEndpoint()
  getHealthz(): boolean {
    return true;
  }

  @Post()
  @ApiOperation({
    summary:
      "Push a VC to Pontus-X, XFSC Federated Catalog and Gaia-X's CredentialEventService",
    description: 'Put a VC in in the request body',
  })
  @ApiTags('schieber')
  @ApiProperty()
  async publishVcEverywhere(
    @Body() body: string, // TODO: use dto, also validation is never a bad idea
  ) {
    return await this.appService.publishEverything(body);
  }
}
