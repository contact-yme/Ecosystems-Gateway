# Publishing connector

A small service to push Gaia-X Verifiable Credentials (VC's) to [Pontus-X](https://portal.euprogigant.io/search?sortOrder=desc&text=&sort=nft.created),
[XFSC-Catalog](https://gitlab.eclipse.org/eclipse/xfsc/cat/fc-service) and 
[CredentialEventService](https://gitlab.com/gaia-x/lab/credentials-events-service/-/tree/main?ref_type=heads).


It offers a gRPC API described in [here](./src/_proto/spp.proto).

While the REST API is currently __not__ supported.


## Installation

```bash
$ npm install
```


## Configuration

See the example `.env.example` for enviroments variables that can be set.

Mandatory are the values `NETWORK`, `PRIVATE_KEY` (for Pontus-X) and `CES_URL` for the CredentialEventService.


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

At the moment, types for gRPC are created with the the tool below and then handpicked. `protoc` can be downloaded here: https://github.com/protocolbuffers/protobuf/releases

```
protoc \
        --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
        --ts_proto_opt=esModuleInterop=true \
        --ts_proto_out="./src/generated" \
        src/_proto/spp.proto
```