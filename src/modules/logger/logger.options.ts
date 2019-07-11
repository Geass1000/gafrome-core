import { Interfaces, Constants, Enums } from './shared';

export const DefaultOptions: Interfaces.Options = {
  level: Enums.LogLevel.Log,
  formats: {
    metamessage: `TIMESTAMP - [LOG_LEVEL] CLASS_NAME - METHOD_NAME:`,
    timestamp: `YYYY.MM.DD-HH:mm:ss`
  },
  styles: {
    disabled: false,
    common: {
      colors: {
        timestamp: Enums.TextColor.White,
        className: Enums.TextColor.Yellow,
        methodName: Enums.TextColor.Green,
      },
    },
    [`${Enums.LogLevel.Error}`]: {
      colors: {
        logLevel: Enums.TextColor.BrightRed,
      },
    },
    [`${Enums.LogLevel.Warn}`]: {
      colors: {
        logLevel: Enums.TextColor.BrightYellow,
      },
    },
    [`${Enums.LogLevel.Info}`]: {
      colors: {
        logLevel: Enums.TextColor.Green,
      },
    },
    [`${Enums.LogLevel.Debug}`]: {
      colors: {
        logLevel: Enums.TextColor.BrightMagenta,
      },
    },
    [`${Enums.LogLevel.Log}`]: {
      colors: {
        logLevel: Enums.TextColor.BrightCyan,
      },
    },
  }
};
