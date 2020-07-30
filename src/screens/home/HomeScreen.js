import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import { colors, sizes, sizeRatio } from '../../utils/theme';
import AddCard from './cards/AddCard';
import ExpenseCard from './cards/ExpenseCard';
import TravelRequestCard from './cards/TravelRequestCard';
import TravelSettleCard from './cards/TravelSettleCard';
import ApprovalCard from './cards/ApprovalCard';
import CreditCard from './cards/CreditCard';

const HomeScreen = props => {

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <AddCard/>
            <ExpenseCard/>
            <TravelRequestCard/>
            <TravelSettleCard/>
            <ApprovalCard/>
            <CreditCard/>
        </ScrollView>
    );

};

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center'
    },
    addCardConatiner: {
        width: 400,
        maxWidth: '100%',
        paddingBottom: 10
    },
    cardTitle: {
        backgroundColor: colors.pri,
        marginBottom: 10,
        borderTopStartRadius: 15,
        borderTopRightRadius: 15
    },
    titleText: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
    },
    optionsContainer: {
        padding: 16
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionStyle: {
        width: 90,
        height: 90,
        borderRadius: 200,
        elevation: 5,

    },
    singleOption: {
        alignItems: 'center'
    },
    optionLabel: {
        marginTop: 10,
        fontSize: 16,
        color: 'black',

    }

});

export default HomeScreen;
