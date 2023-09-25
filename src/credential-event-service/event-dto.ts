export class ComplianceCloudEventDTO {
  specVersion: string;

  type: string;

  source: string;

  subject?: string;

  id: string;

  time: string;

  data: object;
}

export const defaultComplianceCloudEventDTO: ComplianceCloudEventDTO = {
  specVersion: '1.0.0',
  type: 'VerifiableCredential',
  source: 'Konnektor',
  id: '',
  time: '',
  data: undefined,
};
