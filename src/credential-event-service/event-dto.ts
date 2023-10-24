export class ComplianceCloudEventDTO {
  specversion: string;

  type: string;

  source: string;

  subject?: string;

  time: string;

  datacontenttype: string;

  data: object;
}

export const defaultComplianceCloudEventDTO: ComplianceCloudEventDTO = {
  specversion: '1.0',
  type: 'eu.gaia-x.credential',
  source: null,
  time: null,
  datacontenttype: 'application/json',
  data: undefined,
};
