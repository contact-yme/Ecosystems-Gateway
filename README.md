# Publishing connector

A small service to push gaia-x vc to Pontus-X, XFSC-Catalog and CredentialEventService. This is just a proposal, right now!

## Installation

```bash
$ npm install
```


## Configuration

See the example `.env.exmple` for enviroments variables that can be set.

Mandatory are the values `NETWORK`, `PRIVATE_KEY` and `CES_HOST`.


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

At the moment, types for gRPC are created with the the tool below and then handpicked.

```
protoc \
        --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
        --ts_proto_opt=esModuleInterop=true \
        --ts_proto_out="./src/generated" \
        src/_proto/spp.proto
```