import { Observable } from 'rxjs';

export interface Result<Data> {
  result: Data;
}

export type RxResult<Data> = Observable<Result<Data>>;
