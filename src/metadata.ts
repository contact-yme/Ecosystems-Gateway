import { UrlFile } from '@deltadao/nautilus';
import { Metadata } from '@oceanprotocol/lib';

export class metadata {
  main: MainMetadata;
  additionalInformation: addInfo;
}

export class MainMetadata {
  type: Metadata['type'];
  files: UrlFile[];
  name: string;
  author: string;
  description: string;
  license: string;
  created?: string;
  tags?: string[];
}

export class addInfo {
  termsAndConditions: boolean
  gaiaXInformation: {
    containsPII: boolean;
    termsAndConditions: { url: string }[];
    serviceSD: { url: string, isVerified: boolean };
  };
}
