/* eslint-disable no-undef */
import { StyleSheet, Dimensions } from 'react-native';

import { DefaultTheme } from 'react-native-paper';

let windowSize = ({ height, width } = Dimensions.get('window'));

//400 equals one point
const baseRatioDefine = 400;

//size ratio value
export const sizeRatio = windowSize.width / baseRatioDefine;

//colors
export const colors = {
  pri: '#12A8C4',
  priLight: '#36B4CC',
  priDark: '#038DA7',

  sec: '#94cf3f',
  secDark: '#00C72C',
  secLight: '#62E67F',

  warning: '#FFB512',
  error: '#ef5350',
  info: '#1D72AA',

  gray: '#B5B5B5',
  grayLight: '#F5F5F5',
  grayDark: '#999999',

  lightGray: '#cfd8dc',

  activeItem: '#1C00ff00',
  inactive_item: '#737373',

  textSecDark: '#8B8B8B',
  textGrey: '#939393',

  blue_grey_50: '#eceff1',
  blue_grey_100: '#cfd8dc',
  blue_grey_200: '#b0bec5',
  blue_grey_300: '#90a4ae',

  default_input_field: '#e8f5e9',
  disabled_input_field: '#F5F5F5',
  btn_disabled: '#bdbdbd',

  gradient_start: '#FFFFFF',
  gradient_end: '#FFFFFF',

  black: '#363636',
  white: '#FFFFFF',
  bg: '#EDF2F9',

  light_blue: '#e1f5fe',

  red_400: '#ef5350',

  grey_800: '#424242',

  green: '#AAD5AC',
  green_50: '#e8f5e9',
  green_300: '#81c784',
  green_500: '#4caf50',
  green_600: '#43a047',
  green_700: '#388e3c',
  green_800: '#2e7d32',

  yellow_600: '#fdd835',
  yellow_700: '#fbc02d',

  red_50: '#ffebee',
  red_100: '#ffcdd2',
  red_200: '#ef9a9a',
  red_300: '#e57373',
  red_400: '#ef5350',
  red_500: '#f44336',

  amber_400: '#ffca28',

  app_bg: '#e1f5fe',

  approvedBubble: '#e8f5e9',
  rejectedBubble: '#ffebee',

  draft: '#e3f2fd',//'#12A8C4',
  pending: '#fff9c4',//'#ffdd57',
  approved: '#e8f5e9',//'#8bc34a',
  rejected: '#ffebee',//'#ff3860', //#e9504b

  colorPending: '#FFDC84',
  colorUnpaid: '#93E8FB',
  colorPaid: '#AAD5AC',

};

//pre-define sizes
export const sizes = {
  /**khoảng không gian như padding, margin**/
  spaceMd: 20 * sizeRatio,
  spaceLg: 30 * sizeRatio,
  spaceSuperLg: 40 * sizeRatio,
  spaceSm: 10 * sizeRatio,
  spaceTiny: 5 * sizeRatio,

  /**kích cỡ chữ**/
  fontSm: 12 * sizeRatio,
  fontMd: 18 * sizeRatio,
  fontLg: 20 * sizeRatio,
  fontUperLg: 30 * sizeRatio,
  fontSuperLg: 36 * sizeRatio,

  font_10: 10,
  font_12: 12,
  font_14: 14,
  font_16: 16,
  font_18: 18,
  font_20: 20,
  font_24: 24,
  font_34: 34,

  /**kích cỡ bo góc**/
  radiusMd: 4 * sizeRatio,
  radiusLg: 8 * sizeRatio,
  radiusSm: 2 * sizeRatio,
  radiusFull: 100,

  // kích thước cửa sổ
  wW: windowSize.width,
  wH: windowSize.height,
};

//general stylesheet rules
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: colors.white,
  },

  horizontalScroll: {
    paddingVertical: 2,
  },

  textWhite: {
    color: colors.white,
  },

  textDefault: {
    color: colors.black,
  },

  textInput: {
    padding: sizes.spaceSm,
    borderWidth: 0.5,
    borderColor: colors.priDark,
    backgroundColor: colors.white,
    borderRadius: sizes.radiusSm,
    marginBottom: sizes.spaceSm,
    fontSize: sizes.fontSm,
  },

  shadowElevation_2: {
    shadowColor: 'black', //Shadow related are only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.26,
    elevation: 2, //Only for Android
  },

  shadowElevation_5: {
    shadowColor: 'black', //Shadow related are only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    elevation: 5, //Only for Android
  },

  cardSection: {
    flex: 1,
    backgroundColor: colors.grayLight,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    marginTop: 8,
    // borderColor: colors.lightGray,
    // borderWidth: 1.2,
    ...Platform.select({
      ios: {
        paddingTop: 12,
        paddingBottom: 12,
      }
    }),
    shadowColor: 'black', //Shadow related are only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5, //Only for Android
  },
  searchContainer: {
    backgroundColor: colors.white,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 12,
    borderBottomColor: colors.white
  },
  searchInputContainer: {
    borderRadius: 50,
    backgroundColor: colors.white,
    paddingLeft: 8,
    paddingRight: 8,
    shadowColor: 'black', //Shadow related are only for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
    elevation: 3, //Only for Android
  }

});

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.pri,
    accent: colors.sec,
  },
};
