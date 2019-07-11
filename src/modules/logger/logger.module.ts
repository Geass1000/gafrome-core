import { LoggerUtil } from './logger.util';
import * as Nest from '@nestjs/common';

import { Constants } from './shared';

import { DefaultOptions } from './logger.options';
import {
  LoggerService,
  MessageService,
  OptionService,
  StyleService,
} from './services';

@Nest.Module({
  providers: [
    LoggerService,
    OptionService,
    MessageService,
    StyleService,
    LoggerUtil,
    {
      provide: Constants.DI.DefaultLoggerOptions,
      useValue: DefaultOptions,
    },
  ],
  exports: [
    LoggerService,
  ],
})
export class LoggerModule {}
