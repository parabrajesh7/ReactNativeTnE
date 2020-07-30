import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { colors, sizes, sizeRatio } from '../../../utils/theme';
import NavigationService from '../../../navigation/NavigationService';

const CardTitle = props => {


    const onActionClickHandler = () => {
        NavigationService.navigate('MyApproval');
    }

    let rightSideAction;
    rightSideAction =
        <TouchableOpacity
        activeOpacity = {0.8}
        onPress = {onActionClickHandler}>
            <View>
                <Text style={styles.titleText}>ALL</Text>
            </View>
        </TouchableOpacity>


    return (
        <View style={styles.cardTitle}>
            <View style={{ flex: 1 }}>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>
            {props.showAction ? rightSideAction : null}
        </View>
    );
}


const styles = StyleSheet.create({
    cardTitle: {
        backgroundColor: colors.pri,
        marginBottom: 10,
        borderTopStartRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row'
    },
    titleText: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: sizes.font_16,
        color: colors.white,
        fontWeight: 'bold',
    },
});

export default CardTitle;