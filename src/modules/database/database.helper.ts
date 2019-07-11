import * as Nest from '@nestjs/common';
import { Enums, Interfaces } from './shared';

@Nest.Injectable()
export class DatabaseHelper {
  public getConnectionString (type: Enums.DatabaseType, config: Interfaces.DatabaseConifg): string {
    return `${type}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
  }
}
