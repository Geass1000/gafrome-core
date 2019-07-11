import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class UnprocessableEntityException extends BaseException {
  constructor(
    message: string,
    errorCode: number = HttpStatus.UNPROCESSABLE_ENTITY,
    errorName: string = `Unprocessable Entity`,
  ) {
    super(
      message, errorCode, errorName, HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
