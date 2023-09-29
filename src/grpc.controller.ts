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
    return {
      statusCode: 12,
      simpleMessage: 'method publishOfferingJson not implemented',
      DebugInformation: undefined,
    };

    console.log(data.metadata);

    // TODO: use the right input...
    await this.appService.publishEverything(data.metadata);
  }

  @GrpcMethod('serviceofferingPublisher')
  async publishOffering(data: Offering): Promise<Status> {
    this.logger.debug('grpc method publishOffering called');
    this.logger.debug(data);

    //await this.appService.publishEverything(data.main);
    if (data.main.type === 'dataset') {
      const result = await this.pontusxService.publishComputeAsset(data);
      if (result) {
        return {
          statusCode: 0,
          simpleMessage: 'offering published',
          DebugInformation: undefined,
        };
      } else {
        return {
          statusCode: 2,
          simpleMessage: 'publishing not successful',
          DebugInformation: undefined,
        };
      }
    } else {
      return {
        statusCode: 12,
        simpleMessage: 'publishing of non dataset not implemented',
        DebugInformation: undefined,
      };
    }
  }
}
