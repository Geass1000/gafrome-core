import * as Nest from '@nestjs/common';

import * as _ from 'lodash';

import { Interfaces, Constants, Enums } from '../shared';
import { OptionService } from './option.service';

@Nest.Injectable({})
export class StyleService {
  private stylesAreDisabled: boolean;
  private calculatedStyles!: Interfaces.Options.Styles;

  constructor (
    private optionService: OptionService,
  ) {
    this.stylesAreDisabled = this.optionService.getFromOptions('styles.disabled');

    if (this.stylesAreDisabled) {
      return;
    }
    this.calculateStyles();
  }

  public calculateStyle (
    logLevel: Enums.LogLevel,
    fieldName: string,
  ): string {
    if (this.stylesAreDisabled) {
      return '';
    }
    const style = this.calculatedStyles[logLevel] as Interfaces.Options.Style;
    const textColor = style.colors[fieldName];
    const textBackground = style.backgrounds[fieldName];
    const textEffect = style.effects[fieldName];

    return `${textColor}${textBackground}${textEffect}`;
  }

  public useStyle (
    text: string,
    textStyle: string,
    parentStyle: string = '',
  ): string {
    if (this.stylesAreDisabled) {
      return text;
    }
    return `${textStyle}${text}${Enums.TextEffect.Reset}${parentStyle}`;
  }

  private calculateStyles () {
    const logLevels = [
      Enums.LogLevel.Error, Enums.LogLevel.Warn, Enums.LogLevel.Info,
      Enums.LogLevel.Debug, Enums.LogLevel.Log,
    ];
    const elements = [
      'metamessage', 'message', 'logLevel', 'timestamp',
      'className', 'methodName', 'fileName', 'filePath',
    ];

    this.calculatedStyles = {};
    _.map(logLevels, (logLevel) => {
      const levelStyles: Interfaces.Options.Style =
        _.reduce<string, Interfaces.Options.Style>(elements, (styles, element) => {
          const style = this.calculateElementStyle(logLevel, element);

          return {
            colors: {
              ...styles.colors,
              [element]: style.color,
            },
            backgrounds: {
              ...styles.backgrounds,
              [element]: style.background,
            },
            effects: {
              ...styles.effects,
              [element]: style.effect,
            },
          };
        }, { colors: {}, backgrounds: {}, effects: {} });

      this.calculatedStyles[logLevel] = levelStyles;
    });
  }

  private calculateElementStyle (
    logLevel: Enums.LogLevel,
    fieldName: string
  ): Interfaces.Options.ElementStyle {
    const textColor = this.optionService
      .getFromOptions(`styles[${logLevel}].colors.${fieldName}`)
      || this.optionService
      .getFromOptions(`styles['common'].colors.${fieldName}`)
      || '';
    const textBackground = this.optionService
      .getFromOptions(`styles[${logLevel}].backgrounds.${fieldName}`)
      || this.optionService
      .getFromOptions(`styles['common'].backgrounds.${fieldName}`)
      || '';
    const textEffect = this.optionService
      .getFromOptions(`styles[${logLevel}].effects.${fieldName}`)
      || this.optionService
      .getFromOptions(`styles['common'].effects.${fieldName}`)
      || '';
    return { color: textColor, background: textBackground, effect: textEffect };
  }
}
