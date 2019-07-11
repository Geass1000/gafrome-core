import * as Interfaces from './logger.interface';

export namespace DI {
  export const LoggerOptions = Symbol(`DI-Logger-Options`);
  export const DefaultLoggerOptions = Symbol(`DI-Default-Logger-Options`);
}
