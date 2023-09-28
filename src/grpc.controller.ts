import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { JsonOffering, Offering, Status } from './generated/src/_proto/spp';
import { PontusxService } from './pontusx/pontusx.service';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(
    private readonly appService: AppService,
    private readonly pontusxService: PontusxService,
  ) {}

  @GrpcMethod('serviceofferingPublisher')
  async publishOfferingJson(data: JsonOffering): Promise<Status> {
    this.logger.debug('grpc method publishOfferingJson called');

    console.log(data.metadata);

    // TODO: use the right input...
    await this.appService.publishEverything(data.metadata);

    // TODO: what's the response
    return {
      statusCode: 201,
      simpleMessage: 'CREATED',
      DebugInformation: undefined,
    };
  }

  @GrpcMethod('serviceofferingPublisher')
  async publishOffering(data: Offering): Promise<Status> {
    console.log(data);

    //await this.appService.publishEverything(data.main);
    if (data.main.type === 'dataset') {
      await this.pontusxService.publishComputeAsset(data);
    }

    return {
      statusCode: 201,
      simpleMessage: 'CREATED',
      DebugInformation: undefined,
    };
  }
}
