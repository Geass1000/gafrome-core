import * as Nest from '@nestjs/common';

import { NatsService } from './nats.service';

import { Constants } from './shared';

@Nest.Module({
  imports: [
  ],
  providers: [
    NatsService,
    {
      provide: Constants.DI.Client,
      useFactory: (natsService: NatsService) => {
        return natsService.getClient();
      },
      inject: [ NatsService ],
    },
  ],
  exports: [
    Constants.DI.Client,
  ],
})
export class CacheModule {}
