import { join } from 'path';

const cwd: string = process.cwd();

export namespace Folder {
  export const DistPath = join(cwd, 'dist');

  export namespace Dist {
    export namespace Client {
      export const Browser: string = join(DistPath, 'client-browser');
      export const Server: string = join(DistPath, 'client-server');
    }
  }
}
