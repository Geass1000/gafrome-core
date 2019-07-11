import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import { Interfaces, Constants, Enums } from '../shared';
import { MessageService } from './message.service';
import { OptionService } from './option.service';
import { LoggerUtil } from '../logger.util';

@Nest.Injectable({
  scope: Nest.Scope.TRANSIENT,
})
export class LoggerService {
  public set className(name: string) {
    this._className = name;
  }
  public get className() {
    return this._className;
  }
  /**
   * Name of class who uses the current instance of the LoggerService
   */
  private _className: string = '';

  constructor(
    private optionService: OptionService,
    private messageService: MessageService,
    private loggerUtil: LoggerUtil,
  ) {}

  /**
   * Wrapps the `console.error` function and adds log description to the log message.
   *
   * @param  {string} methodName - name of the method who called the `error` function
   * @param  {any[]} ...restMessages - user's messages
   * @returns void
   */
  public error (
    methodName: string,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    this.logMessages(Enums.LogLevel.Error, methodName, firstMessage, restMessages);
  }

  /**
   * Wrapps the `console.warn` function and adds log description to the log message.
   *
   * @param  {string} methodName - name of the method who called the `warn` function
   * @param  {any[]} ...restMessages - user's messages
   * @returns void
   */
  public warn (
    methodName: string,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    this.logMessages(Enums.LogLevel.Warn, methodName, firstMessage, restMessages);
  }

  /**
   * Wrapps the `console.info` function and adds log description to the log message.
   *
   * @param  {string} methodName - name of the method who called the `info` function
   * @param  {any[]} ...restMessages - user's messages
   * @returns void
   */
  public info (
    methodName: string,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    this.logMessages(Enums.LogLevel.Info, methodName, firstMessage, restMessages);
  }

  /**
   * Wrapps the `console.debug` function and adds log description to the log message.
   *
   * @param  {string} methodName - name of the method who called the `debug` function
   * @param  {any[]} ...restMessages - user's messages
   * @returns void
   */
  public debug (
    methodName: string,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    this.logMessages(Enums.LogLevel.Debug, methodName, firstMessage, restMessages);
  }

  /**
   * Wrapps the `console.log` function and adds log description to the log message.
   *
   * @param  {string} methodName - name of the method who called the `log` function
   * @param  {any[]} ...restMessages - user's message
   * @returns voids
   */
  public log (
    methodName: string,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    this.logMessages(Enums.LogLevel.Log, methodName, firstMessage, restMessages);
  }

  /**
   * Calls the corresponding `console` method by the level of logging.
   *
   * @param  {string} methodName - name of the method who called the `log` function
   * @param  {LogLevel} logLevel - level of logging
   * @param  {any[]} ...restMessages - user's messages
   * @returns void
   */
  public print (
    methodName: string,
    logLevel: Enums.LogLevel,
    firstMessage: any,
    ...restMessages: any[]
  ): void {
    switch (logLevel) {
      case Enums.LogLevel.Error:
        this.error(methodName, firstMessage, restMessages);
        return;
      case Enums.LogLevel.Warn:
        this.warn(methodName, firstMessage, restMessages);
        return;
      case Enums.LogLevel.Info:
        this.info(methodName, firstMessage, restMessages);
        return;
      case Enums.LogLevel.Debug:
        this.debug(methodName, firstMessage, restMessages);
        return;
      case Enums.LogLevel.Log:
        this.log(methodName, firstMessage, restMessages);
        return;
    }
  }

  /**
   * Returns true if current level of logging is greater than o equal to log level from params.
   *
   * @param  {LogLevel} level - level of logging
   * @returns boolean
   */
  private isEnabled (
    level: Enums.LogLevel,
  ): boolean {
    return this.optionService.getFromOptions('level') >= level;
  }

  /**
   * Returns true if current level of logging is smaller than log level from params.
   *
   * @param  {LogLevel} level - level of logging
   * @returns boolean
   */
  private isDisabled (
    level: Enums.LogLevel,
  ): boolean {
    return this.optionService.getFromOptions('level') < level;
  }

  /**
   * Calls the log function with description of the message.
   *
   * @param  {Function} logFunc - log function
   * @param  {string} methodName - name of the method who called the log function
   * @param  {any[]} messages - user's messages
   * @returns void
   */
  private logMessages (
    logLevel: Enums.LogLevel,
    methodName: string,
    firstMessage: any,
    restMessages: any[],
  ): void {
    if (this.isDisabled(logLevel)) {
      return;
    }

    const timestamp = this.loggerUtil.getTimestamp();
    const filePath = this.loggerUtil.getFilePath();
    const fileName = this.loggerUtil.getFileName(filePath);
    const logLevelStr = this.loggerUtil.getLogLevel(logLevel);
    const metainfo = {
      logLevel: logLevelStr,
      className: this.className,
      timestamp,
      fileName,
      filePath,
      methodName,
    };

    const metaMessage: string = this.messageService.prepareMetamessage(logLevel, metainfo);
    const messages = this.messageService.prepareMessages(logLevel, [ firstMessage, ...restMessages ]);

    this.callLogFunction(logLevel, metaMessage, messages);
  }

  /**
   * Calls the log function with description of the message.
   *
   * @param  {Function} logFunc - log function
   * @param  {string} methodName - name of the method who called the log function
   * @param  {any[]} messages - user's messages
   * @returns void
   */
  private callLogFunction (
    logLevel: Enums.LogLevel,
    metaMessage: string,
    messages: any[],
  ): void {
    switch (logLevel) {
      case Enums.LogLevel.Error:
        console.error(metaMessage, ...messages);
        break;
      case Enums.LogLevel.Warn:
        console.warn(metaMessage, ...messages);
        break;
      case Enums.LogLevel.Info:
        console.info(metaMessage, ...messages);
        break;
      default:
        console.log(metaMessage, ...messages);
        break;
    }
  }
}
