import React from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { colors, sizes, sizeRatio } from '../utils/theme';

import { IconStyle } from '../utils/IconStyle';

const CloseIcon = require('../assets/image/close.png');
const DoneIcon = require('../assets/image/done.png');

const ActionBar = props => {

    return (
        <View style={styles.container}>
            <View style={styles.leftIconContainer}>
                <Image source={CloseIcon} style={IconStyle.tinyIcon} />
            </View>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Add Business Expense</Text>
            </View>
            <View style={styles.rightIconContainer}>
                <Image source={DoneIcon} style={IconStyle.smallIcon} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: sizes.spaceLg * 2,
        backgroundColor: colors.pri,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Only for Android
    },
    leftIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14
    },
    titlecontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: sizes.fontMd + 5,
        color: colors.white
    },
    rightIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14
    }
});

export default ActionBar;