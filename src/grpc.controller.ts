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
} from './generated/src/_proto/spp_v2';
import { status as GrpcStatusCode } from '@grpc/grpc-js';
import { LifecycleStates } from '@deltadao/nautilus';

@Controller('grpc')
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(private readonly pontusxService: PontusxService, private readonly xfscService: XfscService) {}

  @GrpcMethod('serviceofferingPublisher')
  async createOffering(
    data: CreateOfferingRequest,
  ): Promise<CreateOfferingResponse> {
    this.logger.debug('grpc method CreateOffering called')
    this.logger.debug(data)

    this.ensureDatasetOrThrow(data)

    // Check the selected catalogue
    for(const offering of data.offerings){
      if(offering.pontusxOffering !== undefined) {
        // PONTUS-X
        const result = await this.pontusxService.publishComputeAsset(data);
        if (result) {
          return {
            id: [result.ddo.id],
            DebugInformation: undefined,
          };
        }

        throw new RpcException({
          code: GrpcStatusCode.INTERNAL,
          message: 'Internal Error',
        });
      } else{
        // XFSC

        const VP = JSON.parse(offering.xfscOffering.VP)

        this.xfscService.getToken()
        .then(token => {
          this.xfscService.publish(token, data=VP).then(result => {
            return {
              id: [result]
            }
          })
        })
        .catch(error => {
          this.logger.error('Error occured when trying to get the Token needed for the XFSC catalogue: ', error)

          throw error
        })
      }
    }
  }

  @GrpcMethod('serviceofferingPublisher')
  async updateOffering(
    data: UpdateOfferingRequest,
  ): Promise<UpdateOfferingResponse> {
    this.logger.debug('grpc method UpdateOffering called')
    this.logger.debug(data)

    for(const offering of data.offerings) {
      if(offering.pontusxUpdateOffering !== undefined) {
        // Pontus-X
        const result = await this.pontusxService.updateOffering(data)

        if (result) {
          return {
            id: undefined,
            locations: result.ces,
            DebugInformation: result,
          }
        }

        throw new RpcException({
          code: GrpcStatusCode.INTERNAL,
          message: 'Internal Error',
        })
      } else {
        // XFSC
        const token = await this.xfscService.getToken()
        const hash = offering.xfscUpdateOffering.hash
        const VP = JSON.parse(offering.xfscUpdateOffering.VP)

        const result = await this.xfscService.update(token, hash, VP)

        return {
          id: [result],
          locations: undefined,
          DebugInformation: undefined
        }
      }
    }
  }

  @GrpcMethod('serviceofferingPublisher')
  async updateOfferingLifecycle(
    data: UpdateOfferingLifecycleRequest,
  ): Promise<UpdateOfferingLifecycleResponse> {
    for(const offering of data.offerings) {
      if(offering.pontusxUpdateOfferingLifecycle !== undefined) {
        // Pontus-X
        const result = await this.pontusxService.setState(
          offering.pontusxUpdateOfferingLifecycle.did,
          offering.pontusxUpdateOfferingLifecycle.to as LifecycleStates,
        );
        if (result) {
          return {
            id: undefined,
            DebugInformation: result,
          }
        }

        throw new RpcException({
          code: GrpcStatusCode.INTERNAL,
          message: 'Internal Error',
        })
      } else {
        // XFSC
        const paramToFunction = {
          REVOKED_BY_PUBLISHER: this.xfscService.revoke,
          DELETED: this.xfscService.delete
        } 
        const token = await this.xfscService.getToken()
        const hash = offering.xfscUpdateOfferingLifecycle.hash
        const state = offering.xfscUpdateOfferingLifecycle.to

        const result = paramToFunction[state](token, hash)

        return {
          id: result,
          DebugInformation: undefined
        }
      } 
    }
  }
  

  private ensureDatasetOrThrow(data: CreateOfferingRequest) {
    for(const offering of data.offerings) {
      if (offering.pontusxOffering.additionalInformation == undefined || offering.xfscOffering.VP == undefined) {
        throw new RpcException({
          code: GrpcStatusCode.UNIMPLEMENTED,
          message: 'publishing of non dataset not implemented',
        });
      }
    }
  }
}
