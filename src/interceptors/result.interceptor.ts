import * as Nest from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from '../shared/interfaces';

/**
 * Converts response data to `{ result: data }` JSON format.
 *
 * @interceptor
 */
@Nest.Injectable()
export class ResultInterceptor implements Nest.NestInterceptor {
  public intercept (context: Nest.ExecutionContext, next: Nest.CallHandler): API.RxResult<any> {
    return next
      .handle()
      .pipe(
        map((result) => ({ result })),
      );
  }
}
