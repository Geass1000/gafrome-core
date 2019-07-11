/* Options */
import * as RequestPackage from 'request';

export namespace Request {
    export interface Options extends RequestPackage.CoreOptions {
        domainName: string;
        path: string;
    }
    export type Callback = RequestPackage.RequestCallback;
    export type Instance = RequestPackage.Request;
}
