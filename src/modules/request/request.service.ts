import * as Nest from '@nestjs/common';

import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import * as Rx from 'rxjs';

import * as Request from 'request';
import * as RequestPromise from 'request-promise';

import * as Interfaces from './shared/request.interfaces';
import * as Constants from './shared/request.constants';

@Nest.Injectable()
export class RequestService {
  constructor(
    @Nest.Inject(Constants.DI.Request) private req: Request.RequestAPI<
      Request.Request,
      Request.CoreOptions, Request.RequiredUriUrl>,
    @Nest.Inject(Constants.DI.RequestPromise) private reqPromise: Request.RequestAPI<
      RequestPromise.RequestPromise,
      RequestPromise.RequestPromiseOptions, Request.RequiredUriUrl>
  ) {
  }

  /**
   * Sends the Request Request.
   *
   * @param  {Request} opts - Request options
   * @return {Bluebird<Interfaces.Request.Instance>} - promise with response of the `Request`
   */
  public request(opts: Interfaces.Request.Options, fn: Interfaces.Request.Callback):
      Bluebird<Interfaces.Request.Instance> {
    const reqKey: string = `${opts.domainName}`;
    const RequestOpts = this.toRequestOpts(opts);

    return Bluebird.resolve(this.req(RequestOpts, fn));
  }

  /**
   * Sends the Request Request and return a promise.
   *
   * @param  {Request} opts - Request options
   * @return {Bluebird<any>} - promise with response data
   */
  public requestPromise<T>(opts: Interfaces.Request.Options): Bluebird<T> {
    const RequestOpts = this.toRequestOpts(opts);
    return Bluebird.resolve(this.reqPromise(RequestOpts));
  }

  /**
   * Sends the Request Request and returns a observable.
   *
   * @param  {Request} opts - Request options
   * @return {Bluebird<any>} - observable with response data
   */
  public requestRx<T>(opts: Interfaces.Request.Options): Rx.Observable<T> {
    const reqKey: string = `${opts.domainName}`;

    return Rx.from(this.requestPromise<T>(opts));
  }

  /**
   * HELPERs
   */

  /**
   * Converts the Request options to the Request options.
   *
   * @param  {Interfaces.Request.Options} opts - Request options
   * @return {Request.OptionsWithUri}
   */
  public toRequestOpts(opts: Interfaces.Request.Options): Request.OptionsWithUri {
    const RequestOpts = _.assign({}, opts, {
      uri: `${opts.domainName}/${opts.path}`,
    });
    return RequestOpts;
  }
}
