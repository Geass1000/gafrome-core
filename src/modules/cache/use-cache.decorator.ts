import * as Nest from '@nestjs/common';

import { CacheKey } from './shared/cache.interfaces';
import { CacheInterceptor } from './cache.interceptor';
import { ReflectMetadata } from './shared/cache.constants';

export const UseCache = (cacheKey: CacheKey): ((target: object, key?: any, descriptor?: any) => any) => {
  return (target, key, descriptor) => {
    Nest.SetMetadata(ReflectMetadata.Cache.Key, cacheKey)(target, key, descriptor);
    return Nest.UseInterceptors(CacheInterceptor)(target, key, descriptor);
  };
};
