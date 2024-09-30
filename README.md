# Publishing connector

A service to push Gaia-X Verifiable Credentials (VC's) to [Pontus-X](https://portal.euprogigant.io/search?sortOrder=desc&text=&sort=nft.created),
[XFSC-Catalog](https://gitlab.eclipse.org/eclipse/xfsc/cat/fc-service) and 
[CredentialEventService](https://gitlab.com/gaia-x/lab/credentials-events-service/-/tree/main?ref_type=heads).

It offers a gRPC API described in [here](./src/_proto/spp_v2.proto).

While the REST API is currently __not__ supported, you there is a Http-gRPC gateway you can use.

### Quickstart

The recommended way to run this setup, is to use the [Local Development Common Layer](https://gitlab.euprogigant.kube.a1.digital/sebastian.waldbauer/local-development-core-services).

*Optional* If you enable gRPC Reflection, you can use Postman or any other graphical user-interface that supports gRPC Reflection to auto discover gRPC methods. This is useful in development environments and highly recommended.

## Installation

```bash
npm install
```

## Configuration

See the example `.env.example` for enviroments variables that can be set.

|Key|Value|Description|
|---|---|---|
|GRPC_BIND|Address gRPC service listens on| Defaults to '0.0.0.0:5002'|
|GRPC_GATEWAY_BIND|Address the gRPC<->HTTP Gateway listens on| Defaults to '0.0.0.0:3000'|
|REDIS_ADDRESS|Address of Redis|Defaults to |`127.0.0.1:6379`|
|NETWORK|PONTUSXTEST, PONTUSXDEV, MUMBAI||
|PRIVATE_KEY|ECDSA Private Key|Insert any ECDSA Private Key in DER Format, only used for the Pontus-X Network configuration|
|CES_URL|<https://ces-development.lab.gaia-x.eu/credentials-events>|Is used for the CredentialEventService|
|ENABLE_GRPC_REFLECTION|true/false|Enables the gRPC reflection for automated rpc discovery|

Mandatory are the values `NETWORK`, `PRIVATE_KEY` (for Pontus-X) and `CES_URL` for the CredentialEventService as well as
XFSC_CAT_HOST_SD_ENDPOINT, XFSC_CAT_TOKEN_ENDPOINT, XFSC_USERNAME, XFSC_PASSWORD for the XFSC catalogue.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Build gRPC types

At the moment, types for gRPC are created with the the tool below and then handpicked. `protoc` can be downloaded here: <https://github.com/protocolbuffers/protobuf/releases>

```bash
protoc \
        --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
        --ts_proto_opt=esModuleInterop=true \
        --ts_proto_out="./src/generated" \
        src/_proto/spp.proto
```

For Windows:

```bash
path\to\protoc.exe --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_opt=esModuleInterop=true --ts_proto_out="./src/generated" src/_proto/spp.proto
```

### Development Setup

If you plan to run this in the development environment, please take a look at the [local development core services](https://gitlab.euprogigant.kube.a1.digital/sebastian.waldbauer/local-development-core-services). After you followed the core services setup, you should be able to run the docker-compose.yml in this repository without any problems. Take a look into the docker-compose.yml to check needed changes.
