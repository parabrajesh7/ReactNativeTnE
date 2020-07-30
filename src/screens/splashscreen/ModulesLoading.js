import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
} from 'react-native';

const AppIcon200 = require('../../assets/image/AppIcon200.png');

import { colors, sizes, sizeRatio } from '../../utils/theme';

import { SimpleAnimation } from 'react-native-simple-animations';

export default class ModulesLoading extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={AppIcon200} style={styles.appIcon} />
                {/* <SimpleAnimation delay={100} duration={1500} fade staticType='zoom'> */}
                    <Text style={styles.expenzing}>
                        Expenz
                    <Text style={{ color: colors.sec }}>i</Text>
                        ng
                </Text>
                {/* </SimpleAnimation> */}
                {/* <SimpleAnimation delay={600} duration={1500} staticType='zoom'> */}
                    <Text style={styles.sublogo}>
                        Sourcing, Procurement, Accounts Payable.
                </Text>
                {/* </SimpleAnimation> */}
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.pri} />
                    <Text style={styles.loadingText}>Please wait...</Text>
                </View>
            </View>
        );
    }
};

const AppIconSize = 90 * sizeRatio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appIcon: {
        width: AppIconSize,
        height: AppIconSize,
        marginRight: sizes.spaceSm,
    },
    expenzing: {
        fontSize: sizes.font_24,
        color: colors.pri,
        fontFamily: 'Nunito-Bold',
        marginTop: 10
    },
    sublogo: {
        fontFamily: 'Nunito-Regular',
        fontSize: sizes.font_14,
        color: colors.grayDark,
        marginTop: sizes.spaceTiny,
        marginBottom: sizes.fontSm,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    loadingText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 16,
        fontSize: sizes.font_14,
        color: colors.grayDark
    }
});
