/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../google/protobuf/struct";

export const protobufPackage = "eupg.serviceofferingpublisher";

export enum LifecycleStates {
  ACTIVE = 0,
  END_OF_LIFE = 1,
  DEPRECATED = 2,
  REVOKED_BY_PUBLISHER = 3,
  ORDERING_DISABLED_TEMPORARILY = 4,
  ASSET_UNLISTED = 5,
  UNRECOGNIZED = -1,
}

export function lifecycleStatesFromJSON(object: any): LifecycleStates {
  switch (object) {
    case 0:
    case "ACTIVE":
      return LifecycleStates.ACTIVE;
    case 1:
    case "END_OF_LIFE":
      return LifecycleStates.END_OF_LIFE;
    case 2:
    case "DEPRECATED":
      return LifecycleStates.DEPRECATED;
    case 3:
    case "REVOKED_BY_PUBLISHER":
      return LifecycleStates.REVOKED_BY_PUBLISHER;
    case 4:
    case "ORDERING_DISABLED_TEMPORARILY":
      return LifecycleStates.ORDERING_DISABLED_TEMPORARILY;
    case 5:
    case "ASSET_UNLISTED":
      return LifecycleStates.ASSET_UNLISTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LifecycleStates.UNRECOGNIZED;
  }
}

export function lifecycleStatesToJSON(object: LifecycleStates): string {
  switch (object) {
    case LifecycleStates.ACTIVE:
      return "ACTIVE";
    case LifecycleStates.END_OF_LIFE:
      return "END_OF_LIFE";
    case LifecycleStates.DEPRECATED:
      return "DEPRECATED";
    case LifecycleStates.REVOKED_BY_PUBLISHER:
      return "REVOKED_BY_PUBLISHER";
    case LifecycleStates.ORDERING_DISABLED_TEMPORARILY:
      return "ORDERING_DISABLED_TEMPORARILY";
    case LifecycleStates.ASSET_UNLISTED:
      return "ASSET_UNLISTED";
    case LifecycleStates.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface CreateOfferingRequest {
  main: Main | undefined;
  additionalInformation: AdditionalInformation | undefined;
  token: string;
  name: string;
}

export interface UpdateOfferingRequest {
  did: string;
  main: Main | undefined;
  additionalInformation: AdditionalInformation | undefined;
  token: string;
  name: string;
  publishInfo?: PublishInfo | undefined;
}

export interface UpdateOfferingLifecycleRequest {
  did: string;
  to: LifecycleStates;
}

export interface PublishInfo {
  source: string;
  data: string;
}

export interface Main {
  type: string;
  author: string;
  licence: string;
  dateCreated: string;
  files: Files[];
  tags: string[];
  description: string;
  allowedAlgorithm: Algorithm[];
}

export interface AdditionalInformation {
  description: string;
  serviceSelfDescription: ServiceSelfDescription | undefined;
  termsAndConditions: boolean;
  gaiaXInformation: gaiaX | undefined;
}

export interface Files {
  url: string;
  indest: number;
  contentType: string;
  method: string;
  index: number;
}

export interface Algorithm {
  did: string;
  filesChecksum: string;
  containerSectionChecksum: string;
}

export interface ServiceSelfDescription {
  url: string;
  isVerified: boolean;
}

export interface gaiaX {
  containsPII: boolean;
  termsAndConditions: Terms[];
  serviceSD: ServiceSelfDescription | undefined;
}

export interface Terms {
  url: string;
}

export interface CreateOfferingResponse {
  did: string;
  DebugInformation: { [key: string]: any } | undefined;
}

export interface UpdateOfferingResponse {
  location?: string | undefined;
  DebugInformation: { [key: string]: any } | undefined;
}

export interface UpdateOfferingLifecycleResponse {
}

function createBaseCreateOfferingRequest(): CreateOfferingRequest {
  return { main: undefined, additionalInformation: undefined, token: "", name: "" };
}

export const CreateOfferingRequest = {
  encode(message: CreateOfferingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.main !== undefined) {
      Main.encode(message.main, writer.uint32(18).fork()).ldelim();
    }
    if (message.additionalInformation !== undefined) {
      AdditionalInformation.encode(message.additionalInformation, writer.uint32(26).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(34).string(message.token);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOfferingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.main = Main.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.additionalInformation = AdditionalInformation.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.token = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CreateOfferingRequest {
    return {
      main: isSet(object.main) ? Main.fromJSON(object.main) : undefined,
      additionalInformation: isSet(object.additionalInformation)
        ? AdditionalInformation.fromJSON(object.additionalInformation)
        : undefined,
      token: isSet(object.token) ? String(object.token) : "",
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: CreateOfferingRequest): unknown {
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
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOfferingRequest>, I>>(base?: I): CreateOfferingRequest {
    return CreateOfferingRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOfferingRequest>, I>>(object: I): CreateOfferingRequest {
    const message = createBaseCreateOfferingRequest();
    message.main = (object.main !== undefined && object.main !== null) ? Main.fromPartial(object.main) : undefined;
    message.additionalInformation =
      (object.additionalInformation !== undefined && object.additionalInformation !== null)
        ? AdditionalInformation.fromPartial(object.additionalInformation)
        : undefined;
    message.token = object.token ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseUpdateOfferingRequest(): UpdateOfferingRequest {
  return { did: "", main: undefined, additionalInformation: undefined, token: "", name: "", publishInfo: undefined };
}

export const UpdateOfferingRequest = {
  encode(message: UpdateOfferingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.main !== undefined) {
      Main.encode(message.main, writer.uint32(18).fork()).ldelim();
    }
    if (message.additionalInformation !== undefined) {
      AdditionalInformation.encode(message.additionalInformation, writer.uint32(26).fork()).ldelim();
    }
    if (message.token !== "") {
      writer.uint32(34).string(message.token);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    if (message.publishInfo !== undefined) {
      PublishInfo.encode(message.publishInfo, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOfferingRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.main = Main.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.additionalInformation = AdditionalInformation.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.token = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.name = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.publishInfo = PublishInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateOfferingRequest {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      main: isSet(object.main) ? Main.fromJSON(object.main) : undefined,
      additionalInformation: isSet(object.additionalInformation)
        ? AdditionalInformation.fromJSON(object.additionalInformation)
        : undefined,
      token: isSet(object.token) ? String(object.token) : "",
      name: isSet(object.name) ? String(object.name) : "",
      publishInfo: isSet(object.publishInfo) ? PublishInfo.fromJSON(object.publishInfo) : undefined,
    };
  },

  toJSON(message: UpdateOfferingRequest): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
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
    if (message.publishInfo !== undefined) {
      obj.publishInfo = PublishInfo.toJSON(message.publishInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOfferingRequest>, I>>(base?: I): UpdateOfferingRequest {
    return UpdateOfferingRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOfferingRequest>, I>>(object: I): UpdateOfferingRequest {
    const message = createBaseUpdateOfferingRequest();
    message.did = object.did ?? "";
    message.main = (object.main !== undefined && object.main !== null) ? Main.fromPartial(object.main) : undefined;
    message.additionalInformation =
      (object.additionalInformation !== undefined && object.additionalInformation !== null)
        ? AdditionalInformation.fromPartial(object.additionalInformation)
        : undefined;
    message.token = object.token ?? "";
    message.name = object.name ?? "";
    message.publishInfo = (object.publishInfo !== undefined && object.publishInfo !== null)
      ? PublishInfo.fromPartial(object.publishInfo)
      : undefined;
    return message;
  },
};

function createBaseUpdateOfferingLifecycleRequest(): UpdateOfferingLifecycleRequest {
  return { did: "", to: 0 };
}

export const UpdateOfferingLifecycleRequest = {
  encode(message: UpdateOfferingLifecycleRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.to !== 0) {
      writer.uint32(16).int32(message.to);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferingLifecycleRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOfferingLifecycleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.to = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateOfferingLifecycleRequest {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      to: isSet(object.to) ? lifecycleStatesFromJSON(object.to) : 0,
    };
  },

  toJSON(message: UpdateOfferingLifecycleRequest): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.to !== 0) {
      obj.to = lifecycleStatesToJSON(message.to);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOfferingLifecycleRequest>, I>>(base?: I): UpdateOfferingLifecycleRequest {
    return UpdateOfferingLifecycleRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOfferingLifecycleRequest>, I>>(
    object: I,
  ): UpdateOfferingLifecycleRequest {
    const message = createBaseUpdateOfferingLifecycleRequest();
    message.did = object.did ?? "";
    message.to = object.to ?? 0;
    return message;
  },
};

function createBasePublishInfo(): PublishInfo {
  return { source: "", data: "" };
}

export const PublishInfo = {
  encode(message: PublishInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.source !== "") {
      writer.uint32(10).string(message.source);
    }
    if (message.data !== "") {
      writer.uint32(18).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PublishInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePublishInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.source = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PublishInfo {
    return {
      source: isSet(object.source) ? String(object.source) : "",
      data: isSet(object.data) ? String(object.data) : "",
    };
  },

  toJSON(message: PublishInfo): unknown {
    const obj: any = {};
    if (message.source !== "") {
      obj.source = message.source;
    }
    if (message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PublishInfo>, I>>(base?: I): PublishInfo {
    return PublishInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PublishInfo>, I>>(object: I): PublishInfo {
    const message = createBasePublishInfo();
    message.source = object.source ?? "";
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseMain(): Main {
  return {
    type: "",
    author: "",
    licence: "",
    dateCreated: "",
    files: [],
    tags: [],
    description: "",
    allowedAlgorithm: [],
  };
}

export const Main = {
  encode(message: Main, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
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
    for (const v of message.tags) {
      writer.uint32(58).string(v!);
    }
    if (message.description !== "") {
      writer.uint32(66).string(message.description);
    }
    for (const v of message.allowedAlgorithm) {
      Algorithm.encode(v!, writer.uint32(74).fork()).ldelim();
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
        case 7:
          if (tag !== 58) {
            break;
          }

          message.tags.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.description = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.allowedAlgorithm.push(Algorithm.decode(reader, reader.uint32()));
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
      author: isSet(object.author) ? String(object.author) : "",
      licence: isSet(object.licence) ? String(object.licence) : "",
      dateCreated: isSet(object.dateCreated) ? String(object.dateCreated) : "",
      files: Array.isArray(object?.files) ? object.files.map((e: any) => Files.fromJSON(e)) : [],
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
      description: isSet(object.description) ? String(object.description) : "",
      allowedAlgorithm: Array.isArray(object?.allowedAlgorithm)
        ? object.allowedAlgorithm.map((e: any) => Algorithm.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Main): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
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
    if (message.tags?.length) {
      obj.tags = message.tags;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.allowedAlgorithm?.length) {
      obj.allowedAlgorithm = message.allowedAlgorithm.map((e) => Algorithm.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Main>, I>>(base?: I): Main {
    return Main.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Main>, I>>(object: I): Main {
    const message = createBaseMain();
    message.type = object.type ?? "";
    message.author = object.author ?? "";
    message.licence = object.licence ?? "";
    message.dateCreated = object.dateCreated ?? "";
    message.files = object.files?.map((e) => Files.fromPartial(e)) || [];
    message.tags = object.tags?.map((e) => e) || [];
    message.description = object.description ?? "";
    message.allowedAlgorithm = object.allowedAlgorithm?.map((e) => Algorithm.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAdditionalInformation(): AdditionalInformation {
  return { description: "", serviceSelfDescription: undefined, termsAndConditions: false, gaiaXInformation: undefined };
}

export const AdditionalInformation = {
  encode(message: AdditionalInformation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.serviceSelfDescription !== undefined) {
      ServiceSelfDescription.encode(message.serviceSelfDescription, writer.uint32(26).fork()).ldelim();
    }
    if (message.termsAndConditions === true) {
      writer.uint32(32).bool(message.termsAndConditions);
    }
    if (message.gaiaXInformation !== undefined) {
      gaiaX.encode(message.gaiaXInformation, writer.uint32(42).fork()).ldelim();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.serviceSelfDescription = ServiceSelfDescription.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.termsAndConditions = reader.bool();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.gaiaXInformation = gaiaX.decode(reader, reader.uint32());
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
      serviceSelfDescription: isSet(object.serviceSelfDescription)
        ? ServiceSelfDescription.fromJSON(object.serviceSelfDescription)
        : undefined,
      termsAndConditions: isSet(object.termsAndConditions) ? Boolean(object.termsAndConditions) : false,
      gaiaXInformation: isSet(object.gaiaXInformation) ? gaiaX.fromJSON(object.gaiaXInformation) : undefined,
    };
  },

  toJSON(message: AdditionalInformation): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.serviceSelfDescription !== undefined) {
      obj.serviceSelfDescription = ServiceSelfDescription.toJSON(message.serviceSelfDescription);
    }
    if (message.termsAndConditions === true) {
      obj.termsAndConditions = message.termsAndConditions;
    }
    if (message.gaiaXInformation !== undefined) {
      obj.gaiaXInformation = gaiaX.toJSON(message.gaiaXInformation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AdditionalInformation>, I>>(base?: I): AdditionalInformation {
    return AdditionalInformation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AdditionalInformation>, I>>(object: I): AdditionalInformation {
    const message = createBaseAdditionalInformation();
    message.description = object.description ?? "";
    message.serviceSelfDescription =
      (object.serviceSelfDescription !== undefined && object.serviceSelfDescription !== null)
        ? ServiceSelfDescription.fromPartial(object.serviceSelfDescription)
        : undefined;
    message.termsAndConditions = object.termsAndConditions ?? false;
    message.gaiaXInformation = (object.gaiaXInformation !== undefined && object.gaiaXInformation !== null)
      ? gaiaX.fromPartial(object.gaiaXInformation)
      : undefined;
    return message;
  },
};

function createBaseFiles(): Files {
  return { url: "", indest: 0, contentType: "", method: "", index: 0 };
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
    if (message.method !== "") {
      writer.uint32(34).string(message.method);
    }
    if (message.index !== 0) {
      writer.uint32(40).int32(message.index);
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
        case 4:
          if (tag !== 34) {
            break;
          }

          message.method = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.index = reader.int32();
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
      method: isSet(object.method) ? String(object.method) : "",
      index: isSet(object.index) ? Number(object.index) : 0,
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
    if (message.method !== "") {
      obj.method = message.method;
    }
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
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
    message.method = object.method ?? "";
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseAlgorithm(): Algorithm {
  return { did: "", filesChecksum: "", containerSectionChecksum: "" };
}

export const Algorithm = {
  encode(message: Algorithm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.filesChecksum !== "") {
      writer.uint32(18).string(message.filesChecksum);
    }
    if (message.containerSectionChecksum !== "") {
      writer.uint32(26).string(message.containerSectionChecksum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Algorithm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAlgorithm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.filesChecksum = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.containerSectionChecksum = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Algorithm {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      filesChecksum: isSet(object.filesChecksum) ? String(object.filesChecksum) : "",
      containerSectionChecksum: isSet(object.containerSectionChecksum) ? String(object.containerSectionChecksum) : "",
    };
  },

  toJSON(message: Algorithm): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.filesChecksum !== "") {
      obj.filesChecksum = message.filesChecksum;
    }
    if (message.containerSectionChecksum !== "") {
      obj.containerSectionChecksum = message.containerSectionChecksum;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Algorithm>, I>>(base?: I): Algorithm {
    return Algorithm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Algorithm>, I>>(object: I): Algorithm {
    const message = createBaseAlgorithm();
    message.did = object.did ?? "";
    message.filesChecksum = object.filesChecksum ?? "";
    message.containerSectionChecksum = object.containerSectionChecksum ?? "";
    return message;
  },
};

function createBaseServiceSelfDescription(): ServiceSelfDescription {
  return { url: "", isVerified: false };
}

export const ServiceSelfDescription = {
  encode(message: ServiceSelfDescription, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    if (message.isVerified === true) {
      writer.uint32(16).bool(message.isVerified);
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
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isVerified = reader.bool();
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
    return {
      url: isSet(object.url) ? String(object.url) : "",
      isVerified: isSet(object.isVerified) ? Boolean(object.isVerified) : false,
    };
  },

  toJSON(message: ServiceSelfDescription): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    if (message.isVerified === true) {
      obj.isVerified = message.isVerified;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServiceSelfDescription>, I>>(base?: I): ServiceSelfDescription {
    return ServiceSelfDescription.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServiceSelfDescription>, I>>(object: I): ServiceSelfDescription {
    const message = createBaseServiceSelfDescription();
    message.url = object.url ?? "";
    message.isVerified = object.isVerified ?? false;
    return message;
  },
};

function createBasegaiaX(): gaiaX {
  return { containsPII: false, termsAndConditions: [], serviceSD: undefined };
}

export const gaiaX = {
  encode(message: gaiaX, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.containsPII === true) {
      writer.uint32(8).bool(message.containsPII);
    }
    for (const v of message.termsAndConditions) {
      Terms.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.serviceSD !== undefined) {
      ServiceSelfDescription.encode(message.serviceSD, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): gaiaX {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasegaiaX();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.containsPII = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.termsAndConditions.push(Terms.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.serviceSD = ServiceSelfDescription.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): gaiaX {
    return {
      containsPII: isSet(object.containsPII) ? Boolean(object.containsPII) : false,
      termsAndConditions: Array.isArray(object?.termsAndConditions)
        ? object.termsAndConditions.map((e: any) => Terms.fromJSON(e))
        : [],
      serviceSD: isSet(object.serviceSD) ? ServiceSelfDescription.fromJSON(object.serviceSD) : undefined,
    };
  },

  toJSON(message: gaiaX): unknown {
    const obj: any = {};
    if (message.containsPII === true) {
      obj.containsPII = message.containsPII;
    }
    if (message.termsAndConditions?.length) {
      obj.termsAndConditions = message.termsAndConditions.map((e) => Terms.toJSON(e));
    }
    if (message.serviceSD !== undefined) {
      obj.serviceSD = ServiceSelfDescription.toJSON(message.serviceSD);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<gaiaX>, I>>(base?: I): gaiaX {
    return gaiaX.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<gaiaX>, I>>(object: I): gaiaX {
    const message = createBasegaiaX();
    message.containsPII = object.containsPII ?? false;
    message.termsAndConditions = object.termsAndConditions?.map((e) => Terms.fromPartial(e)) || [];
    message.serviceSD = (object.serviceSD !== undefined && object.serviceSD !== null)
      ? ServiceSelfDescription.fromPartial(object.serviceSD)
      : undefined;
    return message;
  },
};

function createBaseTerms(): Terms {
  return { url: "" };
}

export const Terms = {
  encode(message: Terms, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Terms {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTerms();
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

  fromJSON(object: any): Terms {
    return { url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: Terms): unknown {
    const obj: any = {};
    if (message.url !== "") {
      obj.url = message.url;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Terms>, I>>(base?: I): Terms {
    return Terms.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Terms>, I>>(object: I): Terms {
    const message = createBaseTerms();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseCreateOfferingResponse(): CreateOfferingResponse {
  return { did: "", DebugInformation: undefined };
}

export const CreateOfferingResponse = {
  encode(message: CreateOfferingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.DebugInformation !== undefined) {
      Struct.encode(Struct.wrap(message.DebugInformation), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateOfferingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateOfferingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
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

  fromJSON(object: any): CreateOfferingResponse {
    return {
      did: isSet(object.did) ? String(object.did) : "",
      DebugInformation: isObject(object.DebugInformation) ? object.DebugInformation : undefined,
    };
  },

  toJSON(message: CreateOfferingResponse): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.DebugInformation !== undefined) {
      obj.DebugInformation = message.DebugInformation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateOfferingResponse>, I>>(base?: I): CreateOfferingResponse {
    return CreateOfferingResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateOfferingResponse>, I>>(object: I): CreateOfferingResponse {
    const message = createBaseCreateOfferingResponse();
    message.did = object.did ?? "";
    message.DebugInformation = object.DebugInformation ?? undefined;
    return message;
  },
};

function createBaseUpdateOfferingResponse(): UpdateOfferingResponse {
  return { location: undefined, DebugInformation: undefined };
}

export const UpdateOfferingResponse = {
  encode(message: UpdateOfferingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.location !== undefined) {
      writer.uint32(34).string(message.location);
    }
    if (message.DebugInformation !== undefined) {
      Struct.encode(Struct.wrap(message.DebugInformation), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOfferingResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.location = reader.string();
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

  fromJSON(object: any): UpdateOfferingResponse {
    return {
      location: isSet(object.location) ? String(object.location) : undefined,
      DebugInformation: isObject(object.DebugInformation) ? object.DebugInformation : undefined,
    };
  },

  toJSON(message: UpdateOfferingResponse): unknown {
    const obj: any = {};
    if (message.location !== undefined) {
      obj.location = message.location;
    }
    if (message.DebugInformation !== undefined) {
      obj.DebugInformation = message.DebugInformation;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOfferingResponse>, I>>(base?: I): UpdateOfferingResponse {
    return UpdateOfferingResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOfferingResponse>, I>>(object: I): UpdateOfferingResponse {
    const message = createBaseUpdateOfferingResponse();
    message.location = object.location ?? undefined;
    message.DebugInformation = object.DebugInformation ?? undefined;
    return message;
  },
};

function createBaseUpdateOfferingLifecycleResponse(): UpdateOfferingLifecycleResponse {
  return {};
}

export const UpdateOfferingLifecycleResponse = {
  encode(_: UpdateOfferingLifecycleResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateOfferingLifecycleResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateOfferingLifecycleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): UpdateOfferingLifecycleResponse {
    return {};
  },

  toJSON(_: UpdateOfferingLifecycleResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateOfferingLifecycleResponse>, I>>(base?: I): UpdateOfferingLifecycleResponse {
    return UpdateOfferingLifecycleResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateOfferingLifecycleResponse>, I>>(_: I): UpdateOfferingLifecycleResponse {
    const message = createBaseUpdateOfferingLifecycleResponse();
    return message;
  },
};

export interface serviceofferingPublisher {
  CreateOffering(request: CreateOfferingRequest): Promise<CreateOfferingResponse>;
  UpdateOffering(request: UpdateOfferingRequest): Promise<UpdateOfferingResponse>;
  UpdateOfferingLifecycle(request: UpdateOfferingLifecycleRequest): Promise<UpdateOfferingLifecycleResponse>;
}

export const serviceofferingPublisherServiceName = "eupg.serviceofferingpublisher.serviceofferingPublisher";
export class serviceofferingPublisherClientImpl implements serviceofferingPublisher {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || serviceofferingPublisherServiceName;
    this.rpc = rpc;
    this.CreateOffering = this.CreateOffering.bind(this);
    this.UpdateOffering = this.UpdateOffering.bind(this);
    this.UpdateOfferingLifecycle = this.UpdateOfferingLifecycle.bind(this);
  }
  CreateOffering(request: CreateOfferingRequest): Promise<CreateOfferingResponse> {
    const data = CreateOfferingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateOffering", data);
    return promise.then((data) => CreateOfferingResponse.decode(_m0.Reader.create(data)));
  }

  UpdateOffering(request: UpdateOfferingRequest): Promise<UpdateOfferingResponse> {
    const data = UpdateOfferingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateOffering", data);
    return promise.then((data) => UpdateOfferingResponse.decode(_m0.Reader.create(data)));
  }

  UpdateOfferingLifecycle(request: UpdateOfferingLifecycleRequest): Promise<UpdateOfferingLifecycleResponse> {
    const data = UpdateOfferingLifecycleRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateOfferingLifecycle", data);
    return promise.then((data) => UpdateOfferingLifecycleResponse.decode(_m0.Reader.create(data)));
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
