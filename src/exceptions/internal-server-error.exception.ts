import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class InternalServerErrorException extends BaseException {
  constructor(
    message: string,
    errorCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    errorName: string = `Internal Server Error`,
  ) {
    super(
      message, errorCode, errorName, HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
