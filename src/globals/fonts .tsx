// Font Family constants 'TODO custom fonts needs to install'
const { isIOS: iosValue = false } = (() => {
  try {
    return require('../utils/CommonMethods');
  } catch {
    return {};
  }
})();

export default {
  //  Bold : 'OpenSans-Bold',
  //  Regular: 'OpenSans-Regular',
  //  SemiBold: 'OpenSans-SemiBold',
  //  Medium: 'OpenSans-SemiBold',
  //  Light:'OpenSans-Light',

  Bold: 'IBMPlexSans-Bold',
  Regular: iosValue ? 'IBMPlexSans' : 'IBMPlexSans-Regular',
  SemiBold: 'IBMPlexSans-SemiBold',
  Medium: 'IBMPlexSans-Medium',
  Light: 'IBMPlexSans-Light',
  Thin: 'IBMPlexSans-Thin',
  ExtraLight: 'IBMPlexSans-ExtraLight',
};
