import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { PontusxService } from './pontusx/pontusx.service';
import { XfscService } from './xfsc/xfsc.service';
import {
  CreateOfferingRequest,
  CreateOfferingResponse,
  UpdateOfferingRequest,
  UpdateOfferingResponse,
  UpdateOfferingLifecycleRequest,
  UpdateOfferingLifecycleResponse,
} from './generated/src/_proto/spp';
import { status as GrpcStatusCode } from '@grpc/grpc-js';
import { LifecycleStates } from '@deltadao/nautilus';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly pontusxService: PontusxService) {}

  @GrpcMethod('serviceofferingPublisher')
  async createOffering(
    data: CreateOfferingRequest,
  ): Promise<CreateOfferingResponse> {
    this.logger.debug('grpc method CreateOffering called')
    this.logger.debug(data)

    this.ensureDatasetOrThrow(data)

    // Check the selected catalogue

    // XFSC
    const xfscService = new XfscService()
    xfscService.getToken()
    .then(token => {
      xfscService.publish(token, data=data)
    })
    .catch(error => {
      this.logger.error('Error occured when trying to get the Token needed for the XFSC catalogue: ', error)

      throw error
    })

    // PONTUS-X
    const result = await this.pontusxService.publishComputeAsset(data);
    if (result) {
      return {
        did: result.ddo.id,
        DebugInformation: undefined,
      };
    }

    throw new RpcException({
      code: GrpcStatusCode.INTERNAL,
      message: 'Internal Error',
    });
  }

  @GrpcMethod('serviceofferingPublisher')
  async updateOffering(
    data: UpdateOfferingRequest,
  ): Promise<UpdateOfferingResponse> {
    this.logger.debug('grpc method UpdateOffering called')
    this.logger.debug(data)

    // Call XFSC Update function here
    const result = await this.pontusxService.updateOffering(data)

    if (result) {
      return {
        location: result.ces,
        DebugInformation: result,
      }
    }

    throw new RpcException({
      code: GrpcStatusCode.INTERNAL,
      message: 'Internal Error',
    });
  }

  @GrpcMethod('serviceofferingPublisher')
  async updateOfferingLifecycle(
    data: UpdateOfferingLifecycleRequest,
  ): Promise<UpdateOfferingLifecycleResponse> {
    const result = await this.pontusxService.setState(
      data.did,
      data.to as LifecycleStates,
    );
    if (result) {
      return {
        DebugInformation: result,
      };
    }

    throw new RpcException({
      code: GrpcStatusCode.INTERNAL,
      message: 'Internal Error',
    });
  }

  private ensureDatasetOrThrow(data: CreateOfferingRequest) {
    if (data.main.type !== 'dataset') {
      throw new RpcException({
        code: GrpcStatusCode.UNIMPLEMENTED,
        message: 'publishing of non dataset not implemented',
      });
    }
  }
}
