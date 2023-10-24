import { Inject, Injectable, Logger } from '@nestjs/common';
import { XfscService } from './xfsc/xfsc.service';
import { CredentialEventServiceService } from './credential-event-service/credential-event-service.service';
import { PontusxService } from './pontusx/pontusx.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(CredentialEventServiceService.name);

  @Inject(PontusxService)
  private readonly pontusxService: PontusxService;

  @Inject(XfscService)
  private readonly xfscService: XfscService;

  @Inject(CredentialEventServiceService)
  private readonly credentialEventService: CredentialEventServiceService;

  async publishEverything(vc: any): Promise<string> {
    // FIXME: If possible, we can do it in parallel (Promise.all())
    const pontusxResult = await this.pontusxService.publishComputeAsset(vc);
    this.logger.debug('result from pontusx', pontusxResult);

    const xfscResult = await this.xfscService.publish(vc);
    this.logger.debug('result from xfsc catalog', xfscResult);

    const credentialEventResult = await this.credentialEventService.publish(vc);
    this.logger.debug(
      'result from credential event service',
      credentialEventResult,
    );

    return Promise.resolve('All done');
  }
}
