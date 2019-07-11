import * as Exceptions from '../../../exceptions';

import { Enums, Constants } from '../shared';

export class DatabaseException extends Exceptions.InternalServerErrorException {
  constructor(
    message: string,
    errorType: Enums.ExceptionType = Enums.ExceptionType.Database,
  ) {
    super(
      message,
      Constants.Exception.Code[errorType],
      Constants.Exception.Name[errorType],
    );
  }
}
