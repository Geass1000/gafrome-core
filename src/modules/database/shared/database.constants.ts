
export namespace DI {
  export namespace Mongoose {
    export const Connection = Symbol(`DI-Mongoose-Connection`);
    export const Config = Symbol(`DI-Mongoose-Config`);
  }
}

export namespace Exception {
  export const Code = {
    Database: 0,
    Find: 1,
    Create: 2,
    Update: 3,
    Delete: 4,
  };
  export const Name = {
    Database: 'Database Error',
    Find: 'Database.Model.Find Error',
    Create: 'Database.Model.Create Error',
    Update: 'Database.Model.Update Error',
    Delete: 'Database.Model.Delete Error',
  };
}
