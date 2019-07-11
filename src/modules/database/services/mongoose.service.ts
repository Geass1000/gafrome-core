import * as Nest from '@nestjs/common';

import * as mongoose from 'mongoose';
import * as Bluebird from 'bluebird';

import { DatabaseHelper } from '../database.helper';
import { Interfaces, Constants, Enums } from '../shared';

@Nest.Injectable()
export class MongooseService {

  constructor (
    private readonly dbHelper: DatabaseHelper,
    @Nest.Optional() @Nest.Inject(Constants.DI.Mongoose.Config)
      private readonly dbConfig: Interfaces.DatabaseConifg,
  ) {}

  public async connect () {
    (mongoose as any).Promise = Bluebird;
    const connectionString = this.dbHelper
      .getConnectionString(Enums.DatabaseType.Mongodb, this.dbConfig);

    return await mongoose.connect(connectionString, { useNewUrlParser: true });
  }
}
