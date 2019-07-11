import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import { Interfaces, Constants, Enums } from '../shared';

@Nest.Injectable({})
export class OptionService {

  constructor (
    @Nest.Optional() @Nest.Inject(Constants.DI.LoggerOptions)
      private options: Interfaces.Options,
    @Nest.Inject(Constants.DI.DefaultLoggerOptions)
      private defaultOptions: Interfaces.Options,
  ) {}

  public getFromOptions (selector: string) {
    return _.get(this.options, selector)
      || _.get(this.defaultOptions, selector);
  }
}
