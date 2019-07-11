import * as Nest from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import * as _ from 'lodash';

import { NatsException } from './exceptions/nats.exception';
import { Constants } from './shared';

@Nest.Injectable()
export class NatsService {

  constructor (
    @Nest.Optional() @Nest.Inject(Constants.DI.Config)
      private readonly natsConfig: any,
  ) {}

  public async getClient () {
    if (_.isNil(this.natsConfig)) {
      throw new NatsException(`Nats confing not provided`);
    }

    return ClientProxyFactory.create({
      transport: Transport.NATS,
      options: this.natsConfig,
    });
  }
}
