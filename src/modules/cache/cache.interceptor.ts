import * as Nest from '@nestjs/common';
import * as NestCore from '@nestjs/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ReflectMetadata } from './shared/cache.constants';

@Nest.Injectable()
export class CacheInterceptor implements Nest.NestInterceptor {
  constructor(
    @Nest.Inject(Nest.CACHE_MANAGER) protected readonly cacheManager: any,
    protected readonly reflector: NestCore.Reflector,
  ) {}

  async intercept(
    context: Nest.ExecutionContext,
    next: Nest.CallHandler,
  ): Promise<Observable<any>> {
    const key = this.reflector.get(ReflectMetadata.Cache.Key, context.getHandler());

    if (!key) {
      return next.handle();
    }

    try {
      const value = await this.cacheManager.get(key);

      if (value) {
        return of(value);
      }

      return next
        .handle()
        .pipe(tap(response => this.cacheManager.set(key, response)));
    } catch {
      return next.handle();
    }
  }
}
