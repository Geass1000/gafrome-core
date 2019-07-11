import * as Nest from '@nestjs/common';

import { CacheService } from './cache.service';

const NestCacheModule = Nest.CacheModule.register({
  ttl: 0, max: 0,
});

@Nest.Module({
  imports: [
    NestCacheModule,
  ],
  providers: [
    CacheService,
  ],
  exports: [
    CacheService,
  ],
})
export class CacheModule {}
