import * as Nest from '@nestjs/common';

import { CacheKey } from './shared/cache.interfaces';

@Nest.Injectable()
export class CacheService {

  constructor (
    @Nest.Inject(Nest.CACHE_MANAGER)
      private readonly manager: any
  ) {}

  public get<CachedData> (
    key: CacheKey,
  ): Promise<CachedData> {
    return this.manager.get(key);
  }

  public delete (key: CacheKey): void {
    this.manager.del(key);
  }
}
