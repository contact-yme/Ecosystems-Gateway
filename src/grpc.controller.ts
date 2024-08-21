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

    if (results.length) {
      return {
        id: results,
        DebugInformation: undefined,
      };
    }      
  }

  @GrpcMethod('serviceofferingPublisher')
  async updateOffering(
    data: UpdateOfferingRequest,
  ): Promise<UpdateOfferingResponse> {
    this.logger.debug('grpc method UpdateOffering called')
    this.logger.debug(data)

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
        })
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
}
