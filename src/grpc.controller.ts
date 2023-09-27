import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { JsonOffering, Offering, Status } from './generated/src/_proto/spp';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly appService: AppService) {}

  @GrpcMethod('serviceofferingPublisher')
  publishOfferingJson(data: JsonOffering): Status {
    this.logger.debug('grpc method publishOfferingJson called');

    console.log(data.metadata);

    return {
      statusCode: 2,
      simpleMessage: 'Not sure',
      DebugInformation: undefined,
    };
  }

  @GrpcMethod('serviceofferingPublisher')
  publishOffering(data: Offering): Status {
    console.log(data);

    return {
      statusCode: 2,
      simpleMessage: 'Not sure',
      DebugInformation: undefined,
    };
  }
}
