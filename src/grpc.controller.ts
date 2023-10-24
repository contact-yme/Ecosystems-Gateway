import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PontusxService } from './pontusx/pontusx.service';
import {
  CreateOfferingRequest,
  StatusResponse,
  UpdateOfferingRequest,
} from './generated/src/_proto/spp';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly pontusxService: PontusxService) {}

  @GrpcMethod('serviceofferingPublisher')
  async createOffering(data: CreateOfferingRequest): Promise<StatusResponse> {
    this.logger.debug('grpc method CreateOffering called');
    this.logger.debug(data);

    if (data.main.type === 'dataset') {
      const result = await this.pontusxService.publishComputeAsset(data);
      if (result) {
        return {
          statusCode: 0,
          simpleMessage: 'offering published',
          DebugInformation: undefined,
          data: {
            did: result.ddo.id,
            serviceId: result.ddo.services[0].id, // there must be one service
          },
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

  @GrpcMethod('serviceofferingPublisher')
  async updateOffering(data: UpdateOfferingRequest): Promise<StatusResponse> {
    this.logger.debug('grpc method UpdateOffering called');
    this.logger.debug(data);

    const result = await this.pontusxService.updateOffering(data);

    if (result) {
      return {
        statusCode: 0,
        simpleMessage: 'offering updated',
        DebugInformation: result,
      };
    } else {
      return {
        statusCode: 2,
        simpleMessage: 'failed',
        DebugInformation: undefined,
      };
    }
  }
}
