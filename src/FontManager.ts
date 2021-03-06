import { Platform, Text } from 'react-native';
import React from 'react';

type FontStyle = 'normal' | 'italic' | 'oblique';
type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const getItalicName = (isItalic: boolean) => {
  if (isItalic) {
    return 'Italic';
  }
  return '';
};

const font_style_generator = (font_family: string, font_weight: FontWeight, font_style: FontStyle) => {
  let fontFamily = `${font_family}-`;
  const isItalic: boolean = font_style === 'italic';
  switch (font_weight) {
    case 'normal':
      fontFamily += isItalic ? 'Italic' : 'Regular';
      break;
    case 'bold':
      fontFamily += 'Bold' + getItalicName(isItalic);
      break;
    case '100':
    case '200':
      fontFamily += 'Thin' + getItalicName(isItalic);
      break;
    case '300':
      fontFamily += 'Light' + getItalicName(isItalic);
      break;
    case '400':
      fontFamily += isItalic ? 'Italic' : 'Regular';
      break;
    case '500':
    case '600':
      fontFamily += 'Medium' + getItalicName(isItalic);
      break;
    case '700':
    case '800':
      fontFamily += 'Bold' + getItalicName(isItalic);
      break;
    case '900':
      fontFamily += 'Black' + getItalicName(isItalic);
      break;
    case 'bolder':
    case 'lighter':
    default:
      fontFamily += isItalic ? 'Italic' : 'Regular';
      break;
  }

  return { fontFamily: fontFamily, fontWeight: 'normal' };
};

const oldRender = (Text as any).render;

class FontManager {
  init = async (isExpo: boolean = true) => {
    if (isExpo) {
      const Font = require('expo-font');
      await Font.loadAsync({
        'Roboto-Black': require('./fonts/Roboto-Black.ttf'),
        'Roboto-BlackItalic': require('./fonts/Roboto-Black.ttf'),
        'Roboto-Medium': require('./fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('./fonts/Roboto-Medium.ttf'),
        'Roboto-Regular': require('./fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./fonts/Roboto-Thin.ttf'),
        'Roboto-ThinItalic': require('./fonts/Roboto-Thin.ttf'),
        'Roboto-Bold': require('./fonts/Roboto-Bold.ttf'),
        'Roboto-BoldItalic': require('./fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('./fonts/Roboto-Light.ttf'),
        'Roboto-LightItalic': require('./fonts/Roboto-Light.ttf'),
        'Roboto-Italic': require('./fonts/Roboto-Light.ttf'),
      });
    }
    (Text as any).render = this.override;
  };

  override = (...args: any) => {
    const origin = oldRender.call(this, ...args);

    if (Platform.OS === 'android') {
      if (origin.props.style) {
        const fontWeight: FontWeight = origin.props.style.fontWeight ? origin.props.style.fontWeight : '400';

        const fontStyle: FontStyle = origin.props.style.fontStyle ? origin.props.style.fontStyle : 'normal';

        const fontFamily: string = origin.props.style.fontFamily ? origin.props.style.fontFamily : 'Roboto';

        return React.cloneElement(origin, {
          style: [{}, origin.props.style, font_style_generator(fontFamily, fontWeight, fontStyle)],
        });
      }
      return origin;
    }
    return origin;
  };
}
export default new FontManager();
