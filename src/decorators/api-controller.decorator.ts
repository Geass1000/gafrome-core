import * as _ from 'lodash';
import { Controller, ControllerOptions } from '@nestjs/common';

export const APIController = (version: number, prefixOrOptions?: string | ControllerOptions) => {
  const apiPath = `api/v${version}`;

  if (_.isUndefined(prefixOrOptions)) {
    return Controller(apiPath);
  }

  if (_.isString(prefixOrOptions)) {
    return Controller(`${apiPath}/${prefixOrOptions}`);
  }

  return Controller({
    ...prefixOrOptions,
    path: `${apiPath}/${prefixOrOptions.path}`
  });
};
