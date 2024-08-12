import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { PontusxService } from './pontusx/pontusx.service';
import {
  CreateOfferingRequest,
  CreateOfferingResponse,
  UpdateOfferingRequest,
  UpdateOfferingResponse,
  UpdateOfferingLifecycleRequest,
  UpdateOfferingLifecycleResponse,
  CreateComputeToDataRequest,
  ComputeToDataResponse,
  GetOfferingRequest,
  GetOfferingResponse,
  GetComputeToDataResultResponse,
  CreateComputeToDataResultRequest,
} from './generated/src/_proto/spp_v2';
import { status as GrpcStatusCode } from '@grpc/grpc-js';
import { LifecycleStates } from '@deltadao/nautilus';
import { error } from 'console';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly pontusxService: PontusxService) {}

  @GrpcMethod('serviceofferingPublisher')
  async createOffering(
    data: CreateOfferingRequest,
  ): Promise<CreateOfferingResponse> {
    this.logger.debug('grpc method CreateOffering called');
    this.logger.debug(data);

    const results = [];
    for (const offering of data.offerings) {
      if (offering.pontusxOffering !== undefined) {
        const result = await this.pontusxService.publishAsset(
          offering.pontusxOffering,
        );
        if (result) {
          results.push(result.ddo.id);
        }
      } else {
        //xfscOffering because of oneof
        //missing
      }
    }

    if (results.length) {
      return {
        id: results,
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
    this.logger.debug('grpc method UpdateOffering called');
    this.logger.debug(data);

    const ces_results: Array<string> = [];
    const results = [];
    const ids = [];
    for (const offering of data.offerings) {
      if (offering.pontusxUpdateOffering !== undefined) {
        const result = await this.pontusxService.updateOffering(offering);
        if (result) {
          ces_results.push(result.ces);
          ids.push(result.pontus.ddo.id);
          results.push(result.pontus);
        }
      } else {
        //xfscUpdateOffering because of oneof
        //missing
      }
    }

    if (ces_results.length || results.length) {
      return {
        id: results,
        locations: ces_results,
        DebugInformation: { results },
      };
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
    const results = [];
    const ids = [];
    for (const offering of data.offerings) {
      if (offering.pontusxUpdateOfferingLifecycle !== undefined) {
        const result = await this.pontusxService.setState(
          offering.pontusxUpdateOfferingLifecycle.did,
          offering.pontusxUpdateOfferingLifecycle
            .to as unknown as LifecycleStates, // is there a better way?
        );
        if (result) {
          results.push(result);
          ids.push(offering.pontusxUpdateOfferingLifecycle.did);
        }
      } else {
        //xfscUpdateOffering because of oneof
        //missing
      }
    }

    if (results.length) {
      return {
        id: ids,
        DebugInformation: { results },
      };
    }

    throw new RpcException({
      code: GrpcStatusCode.INTERNAL,
      message: 'Internal Error',
    });
  }

  @GrpcMethod('serviceofferingPublisher')
  async runComputeToData(
    data: CreateComputeToDataRequest,
  ): Promise<ComputeToDataResponse> {
    // TODO: Get service by grpc request
    return await this.pontusxService.requestComputeToData(
      data.did, data.algorithm
    ).then((result) => {
      return {
        jobId: result
      }
    }).catch((err) => {
      throw new RpcException({
        code: GrpcStatusCode.INTERNAL,
        message: err,
      });
    });
  }

  @GrpcMethod('serviceofferingPublisher')
  async getComputeToDataResult(
    data: CreateComputeToDataResultRequest
  ): Promise<GetComputeToDataResultResponse> {
    return await this.pontusxService.getComputeToDataResult(data.JobId).then((res) => {
      if(res == null) {
        throw new RpcException({
          code: GrpcStatusCode.UNAVAILABLE,
          message: "Result is not available"
        })
      }

      return {
        JobId: data.JobId,
        result: res
      }
    }).catch((err) => {
      throw new RpcException({
        code: GrpcStatusCode.INTERNAL,
        message: err,
      });
    })
  }

  @GrpcMethod('serviceofferingPublisher')
  async getOffering(
    data: GetOfferingRequest
  ): Promise<GetOfferingResponse> {
    const result = await this.pontusxService.getOffering(
      data.did
    );
    if(result) {
      return {
        did: result.id
      };
    }

    throw new RpcException({
      code: GrpcStatusCode.INTERNAL,
      message: 'Internal Error',
    });
  }
}
