import { colors, sizes, sizeRatio } from '../../utils/theme';
import { StyleSheet } from 'react-native';

const AppIconSize = 50 * sizeRatio;

export const LoginStyle = StyleSheet.create({
  container: {
    paddingLeft: sizes.spaceLg,
    paddingRight: sizes.spaceLg,
    paddingBottom: 0,
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  appIconWrap: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  appIcon: {
    width: AppIconSize,
    height: AppIconSize,
    marginRight: sizes.spaceSm,
  },
  expenzing: {
    fontSize: sizes.font_34,
    color: colors.pri,
    flex: 1,
    fontFamily: 'Nunito-Bold',
  },
  sublogo: {
    fontFamily: 'Nunito-Regular',
    fontSize: sizes.font_14,
    color: colors.grayDark,
    marginTop: sizes.spaceSm,
    marginBottom: sizes.fontSuperLg,
  },
  textContainer: {
    // marginBottom: sizes.spaceLg,
  },
  header: {
    fontSize: sizes.font_14,
    color: colors.gray,
    fontWeight: 'bold',
    marginTop: sizes.spaceSm,
  },
  intro: {
    fontSize: sizes.fontMd,
    color: colors.gray,
  },
  formContainer: {
    flexDirection: 'column',
  },
  input: {
    marginBottom: sizes.spaceSm,
    backgroundColor: colors.grayLight,
    //borderColor: '#e5e5e5',
    overflow: 'hidden',

  },
  valid: {},
  inValid: {
    backgroundColor: '#f2dede',
  },
  loginButtonContainer: {
    backgroundColor: colors.pri,
    borderRadius: 5,
    paddingLeft: 38,
    paddingRight: 38,
    paddingTop: 14,
    paddingBottom: 14
  },
  btnText: {
    fontFamily: 'Nunito-Regular',
    fontSize: sizes.font_18,
    color: colors.white
  },
  btnContainer: {
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  snack: {
    backgroundColor: '#fcf8e3',
    left: 0,
    right: 0,
    margin: 0,
    borderWidth: 1,
    borderColor: '#faebcc',
  },
  eye: {
    position: 'absolute',
    right: sizes.spaceSm,
    top: sizes.spaceSm + 5,
    padding: sizes.spaceSm,
  },
  alertDialogTitle: {
    fontSize: sizes.font_20,
    fontWeight: 'bold',
    color: '#263238'
  },
  alertDialogBody: {
    fontSize: sizes.font_16,
    color: '#263238',
  },
  alertButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10
  },
  okayBtn: {
    padding: 0,
    marginTop: sizes.spaceSm,
    elevation: 0,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 18,
  },
});

