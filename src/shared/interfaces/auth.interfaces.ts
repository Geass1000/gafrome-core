import * as Enums from '../enums';

export namespace AccessToken {
  export type Type = string;

  export interface Data {
    userId: string;
    roles: Enums.Auth.Roles[];
  }
}

export interface RedirectOptions {
  state: string;
}
