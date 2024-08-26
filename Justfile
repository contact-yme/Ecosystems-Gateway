build-publishing-connector:
    docker buildx build \
        -t registry.euprogigant.kube.a1.digital/sebastian.waldbauer/publishing-connector/publishing_connector:dev \
        --provenance=false \
        --platform linux/amd64,linux/arm64 \
        .

publish-publishing-connector:
    docker login registry.euprogigant.kube.a1.digital
    docker push registry.euprogigant.kube.a1.digital/sebastian.waldbauer/publishing-connector/publishing_connector:dev

build-protobuf:
    protoc \
        --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
        --ts_proto_opt=esModuleInterop=true \
        --ts_proto_out="./src/generated" \
        src/_proto/spp_v2.proto

grpc-call:
    grpc_cli ls 127.0.0.1:5001 -l
    grpc_cli call 127.0.0.1:5001 RunComputeToData "did: 'did:op:7746d00c660165832b249df2918405de41836d4b3e55d98662e5f5c1279d67b7',algorithm: 'did:op:4f4abf9b761c0537221f98b15fe82dc619843e28e1a43349964fc776e11d5f53'"
