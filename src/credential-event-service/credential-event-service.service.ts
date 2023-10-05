import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  ComplianceCloudEventDTO,
  defaultComplianceCloudEventDTO,
} from './event-dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CredentialEventServiceService {
  private readonly logger = new Logger(CredentialEventServiceService.name);

  constructor(private readonly httpService: HttpService) {}

  async publish(vc: any) {
    // FIXME: config management
    const cesUrl = 'https://ces-v1.lab.gaia-x.eu/credentials-events';

    const payload: ComplianceCloudEventDTO = {
      ...defaultComplianceCloudEventDTO,
      id: randomUUID(),
      subject: null, // FIXME: clarifiy what this field should be
      time: new Date().toISOString(),
      data: vc,
    };

    this.logger.debug(`posting to ${cesUrl}:`, payload);

    const { data } = await firstValueFrom(
      this.httpService.post(cesUrl, payload).pipe(
        catchError((err: AxiosError) => {
          // TODO: proper error handling
          console.error(err);
          this.logger.error(err);
          throw 'Failed to push data to the Credential Event Service';
        }),
      ),
    );
    this.logger.debug('got', data);
    return data;
  }
}
