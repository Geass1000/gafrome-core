import * as Nest from '@nestjs/common';
import { RequestService } from './request.service';
import * as Constants from './shared/request.constants';

import * as request from 'request';
import * as requestPromise from 'request-promise';

@Nest.Module({
  imports: [
  ],
  controllers: [
  ],
  providers: [
    {
      provide: Constants.DI.Request,
      useFactory: () => {
        return request;
      },
    },
    {
      provide: Constants.DI.RequestPromise,
      useFactory: () => {
        return requestPromise;
      },
    },
    RequestService,
  ],
  exports: [
    RequestService
  ],
})
export class RequestModule {}
