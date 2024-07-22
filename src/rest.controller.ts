import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { XfscService } from './xfsc/xfsc.service';
import { CreateOfferingRequest } from './generated/src/_proto/spp';

@Controller()
export class RestController {
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
  @ApiTags('publishing-connector')
  @ApiProperty()
  async publishVcEverywhere(
    @Body() body: CreateOfferingRequest, // TODO: use dto, also validation is never a bad idea
  ) {
    // XFSC Implementation:
    const xfscService = new XfscService()
    xfscService.getToken()
    .then(token => {
      xfscService.publish(token, body)
      console.debug('Successfully Published VC in XFSC Catalogue:\n', body)
    })
    .catch(error => {
      console.error('Error occured when trying to get the Token needed for the XFSC catalogue: ', error)

      throw error
    })


    return await this.appService.publishEverything(body);
  }
}
