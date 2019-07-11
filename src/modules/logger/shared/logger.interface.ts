import * as Enums from './logger.enums';

export interface Metamessage {
  logLevel: string;
  timestamp: string;
  className: string;
  methodName: string;
  fileName: string;
  filePath: string;
}

export namespace Options {
  export interface Format {
    /**
     * Moment format:
     * https://momentjs.com/docs/#/displaying/format/
     */
    timestamp?: string;
    /**
     * Available patterns:
     * TIMESTAMP
     * LOG_LEVEL
     * CLASS_NAME
     * METHOD_NAME
     * FILE_NAME
     */
    metamessage?: string;
  }

  export interface Elements<T> {
    metamessage?: T;
    message?: T;
    logLevel?: T;
    timestamp?: T;
    className?: T;
    methodName?: T;
    fileName?: T;
    filePath?: T;
    [element: string]: T;
  }

  export interface ElementStyle {
    color?: Enums.TextColor;
    background?: Enums.TextBackground;
    effect?: Enums.TextEffect;
  }

  export interface Style {
    colors?: Elements<Enums.TextColor>;
    backgrounds?: Elements<Enums.TextBackground>;
    effects?: Elements<Enums.TextEffect>;
  }

  export interface Styles {
    // Default: false
    disabled?: boolean;
    common?: Style;
    [level: string]: Style|boolean;
  }
}

export interface Options {
  level: Enums.LogLevel;
  formats?: Options.Format;
  styles?: Options.Styles;
}
