/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../google/protobuf/struct";

export const protobufPackage = "eupg.serviceofferingpublisher";

export interface JsonOffering {
  metadata: { [key: string]: any } | undefined;
  token: string;
  name: string;
  allowedAlgorithm: string[];
  deploymentTarget: string;
}

export interface Offering {
  main: Main | undefined;
  additionalInformation: AdditionalInformation | undefined;
  token: string;
  name: string;
  allowedAlgorithm: string[];
  deploymentTarget: string;
}

export interface Main {
  type: string;
  name: string;
  author: string;
  licence: string;
  dateCreated: string;
  files: Files[];
}

export interface AdditionalInformation {
  description: string;
  tags: string[];
  serviceSelfDescription: ServiceSelfDescription | undefined;
}

export interface Files {
  url: string;
  indest: number;
  contentType: string;
}

export interface ServiceSelfDescription {
  url: string;
}

export interface Status {
  statusCode: number;
  simpleMessage: string;
  DebugInformation: { [key: string]: any } | undefined;
}

function createBaseJsonOffering(): JsonOffering {
  return { metadata: undefined, token: "", name: "", allowedAlgorithm: [], deploymentTarget: "" };
}

export const JsonOffering = {
  encode(message: JsonOffering, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== undefined) {
      Struct.encode(Struct.wrap(message.metadata), writer.uint32(10).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    for (const v of message.allowedAlgorithm) {
      writer.uint32(42).string(v!);
    }
    if (message.deploymentTarget !== "") {
      writer.uint32(58).string(message.deploymentTarget);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JsonOffering {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJsonOffering();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.token = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.allowedAlgorithm.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.deploymentTarget = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JsonOffering {
    return {
      metadata: isObject(object.metadata) ? object.metadata : undefined,
      token: isSet(object.token) ? String(object.token) : "",
      name: isSet(object.name) ? String(object.name) : "",
      allowedAlgorithm: Array.isArray(object?.allowedAlgorithm)
        ? object.allowedAlgorithm.map((e: any) => String(e))
        : [],
      deploymentTarget: isSet(object.deploymentTarget) ? String(object.deploymentTarget) : "",
    };
  },

  toJSON(message: JsonOffering): unknown {
    const obj: any = {};
    if (message.metadata !== undefined) {
      obj.metadata = message.metadata;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.allowedAlgorithm?.length) {
      obj.allowedAlgorithm = message.allowedAlgorithm;
    }
    if (message.deploymentTarget !== "") {
      obj.deploymentTarget = message.deploymentTarget;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JsonOffering>, I>>(base?: I): JsonOffering {
    return JsonOffering.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JsonOffering>, I>>(object: I): JsonOffering {
    const message = createBaseJsonOffering();
    message.metadata = object.metadata ?? undefined;
    message.token = object.token ?? "";
    message.name = object.name ?? "";
    message.allowedAlgorithm = object.allowedAlgorithm?.map((e) => e) || [];
    message.deploymentTarget = object.deploymentTarget ?? "";
    return message;
  },
};

function createBaseOffering(): Offering {
  return {
    main: undefined,
    additionalInformation: undefined,
    token: "",
    name: "",
    allowedAlgorithm: [],
    deploymentTarget: "",
  };
}

export const Offering = {
  encode(message: Offering, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.main !== undefined) {
      Main.encode(message.main, writer.uint32(10).fork()).ldelim();
    }
    if (message.additionalInformation !== undefined) {
      AdditionalInformation.encode(message.additionalInformation, writer.uint32(18).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(26).string(message.token);
    }
    if (message.name !== "") {
      writer.uint32(34).string(message.name);
    }
    for (const v of message.allowedAlgorithm) {
      writer.uint32(42).string(v!);
    }
    if (message.deploymentTarget !== "") {
      writer.uint32(58).string(message.deploymentTarget);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Offering {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOffering();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.main = Main.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.additionalInformation = AdditionalInformation.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.token = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.name = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.allowedAlgorithm.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.deploymentTarget = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Offering {
    return {
      main: isSet(object.main) ? Main.fromJSON(object.main) : undefined,
      additionalInformation: isSet(object.additionalInformation)
        ? AdditionalInformation.fromJSON(object.additionalInformation)
        : undefined,
      token: isSet(object.token) ? String(object.token) : "",
      name: isSet(object.name) ? String(object.name) : "",
      allowedAlgorithm: Array.isArray(object?.allowedAlgorithm)
        ? object.allowedAlgorithm.map((e: any) => String(e))
        : [],
      deploymentTarget: isSet(object.deploymentTarget) ? String(object.deploymentTarget) : "",
    };
  },

  toJSON(message: Offering): unknown {
    const obj: any = {};
    if (message.main !== undefined) {
      obj.main = Main.toJSON(message.main);
    }
    if (message.additionalInformation !== undefined) {
      obj.additionalInformation = AdditionalInformation.toJSON(message.additionalInformation);
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.allowedAlgorithm?.length) {
      obj.allowedAlgorithm = message.allowedAlgorithm;
    }
    if (message.deploymentTarget !== "") {
      obj.deploymentTarget = message.deploymentTarget;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Offering>, I>>(base?: I): Offering {
    return Offering.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Offering>, I>>(object: I): Offering {
    const message = createBaseOffering();
    message.main = (object.main !== undefined && object.main !== null) ? Main.fromPartial(object.main) : undefined;
    message.additionalInformation =
      (object.additionalInformation !== undefined && object.additionalInformation !== null)
        ? AdditionalInformation.fromPartial(object.additionalInformation)
        : undefined;
    message.token = object.token ?? "";
    message.name = object.name ?? "";
    message.allowedAlgorithm = object.allowedAlgorithm?.map((e) => e) || [];
    message.deploymentTarget = object.deploymentTarget ?? "";
    return message;
  },
};

function createBaseMain(): Main {
  return { type: "", name: "", author: "", licence: "", dateCreated: "", files: [] };
}

export const Main = {
  encode(message: Main, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.author !== "") {
      writer.uint32(26).string(message.author);
    }
    if (message.licence !== "") {
      writer.uint32(34).string(message.licence);
    }
    if (message.dateCreated !== "") {
      writer.uint32(42).string(message.dateCreated);
    }
    for (const v of message.files) {
      Files.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Main {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.author = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.licence = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.dateCreated = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.files.push(Files.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Main {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      name: isSet(object.name) ? String(object.name) : "",
      author: isSet(object.author) ? String(object.author) : "",
      licence: isSet(object.licence) ? String(object.licence) : "",
      dateCreated: isSet(object.dateCreated) ? String(object.dateCreated) : "",
      files: Array.isArray(object?.files) ? object.files.map((e: any) => Files.fromJSON(e)) : [],
    };
  },

  toJSON(message: Main): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.author !== "") {
      obj.author = message.author;
    }
    if (message.licence !== "") {
      obj.licence = message.licence;
    }
    if (message.dateCreated !== "") {
      obj.dateCreated = message.dateCreated;
    }
    if (message.files?.length) {
      obj.files = message.files.map((e) => Files.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Main>, I>>(base?: I): Main {
    return Main.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Main>, I>>(object: I): Main {
    const message = createBaseMain();
    message.type = object.type ?? "";
    message.name = object.name ?? "";
    message.author = object.author ?? "";
    message.licence = object.licence ?? "";
    message.dateCreated = object.dateCreated ?? "";
    message.files = object.files?.map((e) => Files.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAdditionalInformation(): AdditionalInformation {
  return { description: "", tags: [], serviceSelfDescription: undefined };
}

export const AdditionalInformation = {
  encode(message: AdditionalInformation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    for (const v of message.tags) {
      writer.uint32(18).string(v!);
    }
    if (message.serviceSelfDescription !== undefined) {
      ServiceSelfDescription.encode(message.serviceSelfDescription, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdditionalInformation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdditionalInformation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.tags.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.serviceSelfDescription = ServiceSelfDescription.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AdditionalInformation {
    return {
      description: isSet(object.description) ? String(object.description) : "",
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
      serviceSelfDescription: isSet(object.serviceSelfDescription)
        ? ServiceSelfDescription.fromJSON(object.serviceSelfDescription)
        : undefined,
    };
  },

  toJSON(message: AdditionalInformation): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.serviceSelfDescription !== undefined) {
      obj.serviceSelfDescription = ServiceSelfDescription.toJSON(message.serviceSelfDescription);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AdditionalInformation>, I>>(base?: I): AdditionalInformation {
    return AdditionalInformation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AdditionalInformation>, I>>(object: I): AdditionalInformation {
    const message = createBaseAdditionalInformation();
    message.description = object.description ?? "";
    message.tags = object.tags?.map((e) => e) || [];
    message.serviceSelfDescription =
      (object.serviceSelfDescription !== undefined && object.serviceSelfDescription !== null)
        ? ServiceSelfDescription.fromPartial(object.serviceSelfDescription)
        : undefined;
    return message;
  },
};

function createBaseFiles(): Files {
  return { url: "", indest: 0, contentType: "" };
}

export const Files = {
  encode(message: Files, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.indest !== 0) {
      writer.uint32(16).int32(message.indest);
    }
    if (message.contentType !== "") {
      writer.uint32(26).string(message.contentType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Files {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFiles();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.indest = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contentType = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Files {
    return {
      url: isSet(object.url) ? String(object.url) : "",
      indest: isSet(object.indest) ? Number(object.indest) : 0,
      contentType: isSet(object.contentType) ? String(object.contentType) : "",
    };
  },

  toJSON(message: Files): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.indest !== 0) {
      obj.indest = Math.round(message.indest);
    }
    if (message.contentType !== "") {
      obj.contentType = message.contentType;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Files>, I>>(base?: I): Files {
    return Files.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Files>, I>>(object: I): Files {
    const message = createBaseFiles();
    message.url = object.url ?? "";
    message.indest = object.indest ?? 0;
    message.contentType = object.contentType ?? "";
    return message;
  },
};

function createBaseServiceSelfDescription(): ServiceSelfDescription {
  return { url: "" };
}

export const ServiceSelfDescription = {
  encode(message: ServiceSelfDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceSelfDescription {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceSelfDescription();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServiceSelfDescription {
    return { url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: ServiceSelfDescription): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServiceSelfDescription>, I>>(base?: I): ServiceSelfDescription {
    return ServiceSelfDescription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServiceSelfDescription>, I>>(object: I): ServiceSelfDescription {
    const message = createBaseServiceSelfDescription();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseStatus(): Status {
  return { statusCode: 0, simpleMessage: "", DebugInformation: undefined };
}

export const Status = {
  encode(message: Status, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.statusCode !== 0) {
      writer.uint32(8).int32(message.statusCode);
    }
    if (message.simpleMessage !== "") {
      writer.uint32(18).string(message.simpleMessage);
    }
    if (message.DebugInformation !== undefined) {
      Struct.encode(Struct.wrap(message.DebugInformation), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Status {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.statusCode = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.simpleMessage = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.DebugInformation = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Status {
    return {
      statusCode: isSet(object.statusCode) ? Number(object.statusCode) : 0,
      simpleMessage: isSet(object.simpleMessage) ? String(object.simpleMessage) : "",
      DebugInformation: isObject(object.DebugInformation) ? object.DebugInformation : undefined,
    };
  },

  toJSON(message: Status): unknown {
    const obj: any = {};
    if (message.statusCode !== 0) {
      obj.statusCode = Math.round(message.statusCode);
    }
    if (message.simpleMessage !== "") {
      obj.simpleMessage = message.simpleMessage;
    }
    if (message.DebugInformation !== undefined) {
      obj.DebugInformation = message.DebugInformation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Status>, I>>(base?: I): Status {
    return Status.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Status>, I>>(object: I): Status {
    const message = createBaseStatus();
    message.statusCode = object.statusCode ?? 0;
    message.simpleMessage = object.simpleMessage ?? "";
    message.DebugInformation = object.DebugInformation ?? undefined;
    return message;
  },
};

export interface serviceofferingPublisher {
  PublishOfferingJson(request: JsonOffering): Promise<Status>;
  PublishOffering(request: Offering): Promise<Status>;
}

export const serviceofferingPublisherServiceName = "eupg.serviceofferingpublisher.serviceofferingPublisher";
export class serviceofferingPublisherClientImpl implements serviceofferingPublisher {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || serviceofferingPublisherServiceName;
    this.rpc = rpc;
    this.PublishOfferingJson = this.PublishOfferingJson.bind(this);
    this.PublishOffering = this.PublishOffering.bind(this);
  }
  PublishOfferingJson(request: JsonOffering): Promise<Status> {
    const data = JsonOffering.encode(request).finish();
    const promise = this.rpc.request(this.service, "PublishOfferingJson", data);
    return promise.then((data) => Status.decode(_m0.Reader.create(data)));
  }

  PublishOffering(request: Offering): Promise<Status> {
    const data = Offering.encode(request).finish();
    const promise = this.rpc.request(this.service, "PublishOffering", data);
    return promise.then((data) => Status.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
