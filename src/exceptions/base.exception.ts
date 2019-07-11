import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    errorCode: number,
    errorName: string,
    httpStatus: HttpStatus
  ) {
    super(
      { code: errorCode, error: errorName, message, },
      httpStatus,
    );
  }

  public toJSON () {
    return {
      response: this.getResponse(),
      status: this.getStatus(),
    };
  }
}
