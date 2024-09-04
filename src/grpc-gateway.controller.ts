import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { loadGrpcClient, loadGrpcServiceDefinition } from './grpc-client.loader';
import * as grpc from '@grpc/grpc-js';

@Controller('grpc')
export class GrpcGatewayController {
  private grpcClient: any;
  private grpcDefinitions: any;

  constructor() {
    this.grpcClient = loadGrpcClient(
      './_proto/spp_v2.proto',
      'eupg.serviceofferingpublisher',
      'serviceofferingPublisher',
      '0.0.0.0:5002'
    );

    this.grpcDefinitions = loadGrpcServiceDefinition('./_proto/spp_v2.proto', 'eupg.serviceofferingpublisher', 'serviceofferingPublisher');

    console.log(`Loaded ${Object.keys(this.grpcDefinitions.service).length} grpc services`)
  }

  @Get('list')
  listMethods() {
    if (!this.grpcDefinitions || !this.grpcDefinitions.service) {
      throw new Error('gRPC service is not loaded or available.');
    }

    const methods = Object.keys(this.grpcDefinitions.service).map((methodName) => ({
      methodName,
      path: this.grpcDefinitions.service[methodName].path,
      requestStream: this.grpcDefinitions.service[methodName].requestStream,
      responseStream: this.grpcDefinitions.service[methodName].responseStream,
    }));

    return { availableMethods: methods };
  }

  @Get(':method')
  async handleGet(@Param('method') method: string, @Query() query: any) {
    return this.callGrpcMethod(method, query);
  }

  @Post(':method')
  async handlePost(@Param('method') method: string, @Body() body: any) {
    return this.callGrpcMethod(method, body);
  }

  private callGrpcMethod(method: string, params: any) {
    return new Promise((resolve, reject) => {
      if (typeof this.grpcClient[method] !== 'function') {
        return reject(new Error(`Method ${method} does not exist on the gRPC service`));
      }
      this.grpcClient[method](params, (error, response) => {
        if (error) {
          return reject(error);
        }
        return resolve(response);
      });
    });
  }
}
