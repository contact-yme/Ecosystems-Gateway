import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { JsonOffering, Offering, Status } from './generated/src/_proto/spp';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly appService: AppService) {}

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

    await this.appService.publishEverything(data.main);

    return {
      statusCode: 201,
      simpleMessage: 'CREATED',
      DebugInformation: undefined,
    };
  }
}
