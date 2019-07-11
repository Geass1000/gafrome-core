import * as path from 'path';
import * as Nest from '@nestjs/common';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Interfaces, Constants, Enums } from './shared';
import { OptionService } from './services/option.service';

@Nest.Injectable({})
export class LoggerUtil {

  constructor (
    private optionService: OptionService,
  ) {}

  public getTimestamp (): string {
    const format = this.optionService.getFromOptions('formats.timestamp');
    return moment().format(format);
  }

  public getLogLevel (logLevel: Enums.LogLevel): string {
    switch (logLevel) {
      case Enums.LogLevel.Off:
        return 'OFF';
      case Enums.LogLevel.Error:
        return 'ERROR';
      case Enums.LogLevel.Warn:
        return 'WARN';
      case Enums.LogLevel.Info:
        return 'INFO';
      case Enums.LogLevel.Debug:
        return 'DEBUG';
      case Enums.LogLevel.Log:
        return 'LOG';
    }
  }

  public getFilePath (): string {
    const error = new Error();
    try {
      const secondLine = error.stack.split('\n')[1];
      return secondLine.match(/(\..*)\?/)[1];
    } catch (error) {
      return null;
    }
  }

  public getFileName (filePath: string): string {
    if (_.isNull(filePath)) {
      return null;
    }

    try {
      return path.basename(filePath);
    } catch (error) {
      return null;
    }
  }
}
