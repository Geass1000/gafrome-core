import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(
    message: string,
    errorCode: number = HttpStatus.BAD_REQUEST,
    errorName: string = `Bad Request`,
  ) {
    super(
      message, errorCode, errorName, HttpStatus.BAD_REQUEST,
    );
  }
}
