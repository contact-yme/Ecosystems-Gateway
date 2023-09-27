export class ComplianceCloudEventDTO {
  specVersion: string;

  type: string;

  source: string;

  subject?: string;

  id: string;

  time: string;

  datacontenttype: string;

  data: object;
}

export const defaultComplianceCloudEventDTO: ComplianceCloudEventDTO = {
  specVersion: '1.0',
  type: 'eu.gaia-x.credential',
  source: 'Konnektor',
  id: null,
  time: null,
  datacontenttype: 'application/json',
  data: undefined,
};
