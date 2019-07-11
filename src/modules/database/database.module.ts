import * as Nest from '@nestjs/common';

import { LoggerModule } from '../logger';

import { MongooseService } from './services/mongoose.service';
import { DatabaseHelper } from './database.helper';

import { Constants } from './shared';

@Nest.Module({
  imports: [
    LoggerModule,
  ],
  providers: [
    DatabaseHelper,
    MongooseService,
    {
      provide: Constants.DI.Mongoose.Connection,
      useFactory: async (mongooseService: MongooseService) => {
        return await mongooseService.connect();
      },
      inject: [ MongooseService ],
    },
  ],
  exports: [
    Constants.DI.Mongoose.Connection,
  ],
})
export class DatabaseModule {}
