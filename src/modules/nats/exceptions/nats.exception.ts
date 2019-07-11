import * as Exceptions from '../../../exceptions';

import { Constants } from '../shared';

export class NatsException extends Exceptions.InternalServerErrorException {
  constructor(
    message: string,
  ) {
    super(
      message,
      Constants.Exception.Code,
      Constants.Exception.Name,
    );
  }
}
