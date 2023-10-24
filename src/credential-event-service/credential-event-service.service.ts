import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import {
  ComplianceCloudEventDTO,
  defaultComplianceCloudEventDTO,
} from './event-dto';

@Injectable()
export class CredentialEventServiceService {
  private readonly logger = new Logger(CredentialEventServiceService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async publish(source: string, vc: any) {
    const cesUrl = this.configService.getOrThrow('CES_HOST');

    const payload: ComplianceCloudEventDTO = {
      ...defaultComplianceCloudEventDTO,
      source: source,
      subject: null, // FIXME: clarifiy what this field should be
      time: new Date().toISOString(),
      data: vc,
    };

    this.logger.debug(`posting to ${cesUrl}:`, payload);

    const { headers } = await firstValueFrom(
      this.httpService.post(cesUrl, payload).pipe(
        catchError((err: AxiosError) => {
          // TODO: proper error handling
          console.error(err);
          this.logger.error(err);
          throw 'Failed to push data to the Credential Event Service';
        }),
      ),
    );
    this.logger.debug('got', headers);
    console.log('result', headers);
    return headers['location'];
  }
}
