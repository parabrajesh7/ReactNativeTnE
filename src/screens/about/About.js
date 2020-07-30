import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

const AppIcon200 = require('../../assets/image/AppIcon200.png');

import { colors, sizes, sizeRatio } from '../../utils/theme';

import { SimpleAnimation } from 'react-native-simple-animations';

import Card from '../../common/Card';

import CustomDivider from '../../utils/CustomDivider';

//import DeviceInfo from 'react-native-device-info';

const About = props => {

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Image source={AppIcon200} style={styles.appIcon} />
                <SimpleAnimation delay={100} duration={1500} fade staticType='zoom'>
                    <Text style={styles.expenzing}>
                        Expenz
                    <Text style={{ color: colors.sec }}>i</Text>
                        ng
                    </Text>
                </SimpleAnimation>
                <SimpleAnimation delay={600} duration={1500} staticType='zoom'>
                    <Text style={styles.sublogo}>
                        Sourcing, Procurement, Accounts Payable.
                    </Text>
                </SimpleAnimation>
                <View style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.headerText}>App Name</Text>
                            <Text style={styles.subHeaderText}>TNE Mobile App</Text>
                            <CustomDivider bg={colors.lightGray} topMargin={10} />
                            <Text style={{ ...styles.headerText, marginTop: 16 }}>App Version</Text>
                            <Text style={styles.subHeaderText}>12.2</Text>
                            <CustomDivider bg={colors.lightGray} topMargin={10} />
                            <Text style={{ ...styles.headerText, marginTop: 16 }}>Web Compatibility Version</Text>
                            <Text style={styles.subHeaderText}>12.2</Text>
                        </View>
                    </Card>
                </View>
            </View>
        </ScrollView>
    );

};

const AppIconSize = 60 * sizeRatio;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 18
    },
    appIcon: {
        width: AppIconSize,
        height: AppIconSize,
        marginRight: sizes.spaceSm,
    },
    expenzing: {
        fontSize: sizes.font_24,
        color: colors.pri,
        fontWeight: 'bold',
        marginTop: 10
    },
    sublogo: {
        fontSize: sizes.font_14,
        color: colors.grayDark,
        marginTop: sizes.spaceTiny,
        marginBottom: sizes.fontSm,
    },
    cardContainer: {
        padding: 14
    },
    card: {
        width: 400,
        maxWidth: '100%',
    },
    cardContent: {
        padding: 12
    },
    headerText: {
        color: colors.lightGray,
        fontSize: sizes.font_14,
        fontWeight: 'bold'
    },
    subHeaderText: {
        color: colors.black,
        fontSize: sizes.font_16,
        fontWeight: 'bold',
        marginTop: 2
    }


});

export default About;
