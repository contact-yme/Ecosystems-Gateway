/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Struct } from "../../google/protobuf/struct";

export const protobufPackage = "eupg.serviceofferingpublisher";

export interface Offering {
  main: Main | undefined;
  additionalInformation: AdditionalInformation | undefined;
  token: string;
  name: string;
}

export interface Main {
  type: string;
  name: string;
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
  tags: string[];
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

export interface Status {
  statusCode: number;
  simpleMessage: string;
  DebugInformation: { [key: string]: any } | undefined;
}

function createBaseOffering(): Offering {
  return { main: undefined, additionalInformation: undefined, token: "", name: "" };
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
    return message;
  },
};

function createBaseMain(): Main {
  return {
    type: "",
    name: "",
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
      name: isSet(object.name) ? String(object.name) : "",
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
    message.name = object.name ?? "";
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
  return {
    description: "",
    tags: [],
    serviceSelfDescription: undefined,
    termsAndConditions: false,
    gaiaXInformation: undefined,
  };
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
      tags: Array.isArray(object?.tags) ? object.tags.map((e: any) => String(e)) : [],
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
    if (message.tags?.length) {
      obj.tags = message.tags;
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
    message.tags = object.tags?.map((e) => e) || [];
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
  PublishOffering(request: Offering): Promise<Status>;
}

export const serviceofferingPublisherServiceName = "eupg.serviceofferingpublisher.serviceofferingPublisher";
export class serviceofferingPublisherClientImpl implements serviceofferingPublisher {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || serviceofferingPublisherServiceName;
    this.rpc = rpc;
    this.PublishOffering = this.PublishOffering.bind(this);
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
