import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { loadGrpcClient, loadGrpcServiceDefinition } from './grpc-client.loader';

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

    console.log(`Loaded ${Object.keys(this.grpcDefinitions['serviceofferingPublisher'].service).length} grpc services`)
  }

  @Get('list')
  listMethods() {
    const openApiSpec = this.generateOpenApiSpec();
    return openApiSpec;
  }

  private generateOpenApiSpec() {
    const paths: any = {};
    Object.keys(this.grpcDefinitions['serviceofferingPublisher'].service).forEach((methodName) => {
      const method = this.grpcDefinitions['serviceofferingPublisher'].service[methodName];
      paths[`/grpc/${methodName}`] = {
        post: {
          summary: `Invoke ${methodName} method`,
          description: `Calls the gRPC method ${methodName}`,
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: this.getRequestBodySchema(method.requestType),
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: this.getResponseSchema(method.responseType),
                },
              },
            },
          },
        },
      };
    });

    const openApiSpec = {
      openapi: '3.0.0',
      info: {
        title: 'gRPC Gateway API',
        version: '1.0.0',
        description: 'Auto-generated OpenAPI spec for gRPC methods',
      },
      servers: [
        {
          url: 'http://localhost:5001',
        },
      ],
      paths: paths,
    };

    return openApiSpec;
  }

  private getRequestBodySchema(requestType: any) {
    const fields = requestType.type.field || {};

    const properties: any = {};
    Object.values(fields).forEach((field: any) => {
      properties[field.name] = this.mapFieldTypeToOpenAPI(field);
    });

    return {
      type: 'object',
      properties: properties,
    };
  }

  private getResponseSchema(responseType: any) {
    const fields = responseType.type.field || {};

    const properties: any = {};
    Object.values(fields).forEach((field: any) => {
      properties[field.name] = this.mapFieldTypeToOpenAPI(field);
    });

    return {
      type: 'object',
      properties: properties,
    };
  }

  private mapFieldTypeToOpenAPI(field: any) {
    switch (field.type) {
      case 'TYPE_STRING':
        return { type: 'string' };
      case 'TYPE_MESSAGE':
        return { type: 'object' };
      case 'TYPE_ENUM':
        return {
          type: 'string',
          enum: this.grpcDefinitions[field.typeName].type.value ? Object.values(this.grpcDefinitions[field.typeName].type.value) : [],
        };
      default:
        console.log("Not implemented: ", field);
        return { type: 'string' }; // Default fallback
    }
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
