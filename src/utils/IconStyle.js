import { colors, sizes, sizeRatio } from '../utils/theme';
import { StyleSheet } from 'react-native';

export const IconStyle = StyleSheet.create({

    largeXIcon: {
        height: sizes.fontLg + 12,
        width: sizes.fontLg + 12,
    },
    largeIcon: {
        height: sizes.font_24 + 2,
        width: sizes.font_24 + 2,
    },
    smallIcon: {
        height: sizes.fontMd + 4,
        width: sizes.fontMd + 4,
    },
    mediumIcon: {
        height: sizes.fontMd,
        width: sizes.fontMd,
    },
    tinyIcon: {
        height: sizes.fontLg - 5,
        width: sizes.fontLg - 5,
    },
    tinyXIcon: {
        height: sizes.fontSm - 3,
        width: sizes.fontSm - 3,
    }
});