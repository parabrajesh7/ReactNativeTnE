import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Card from '../../../common/Card';
import CardTitle from './CardTitle';
import { colors, sizes, sizeRatio } from '../../../utils/theme';

import NavigationService from '../../../navigation/NavigationService';

import TSSubCardList from './travelsettlesubcard/TSSubCardList';

const TravelSettleCard = props => {

    return (
        <View style={styles.screen}>
            <Card style={styles.cardConatiner}>
                <View>
                    <CardTitle title={'TRAVEL SETTLEMENT'} showAction= {false}/>
                    <View style={{paddingBottom: 10}}>
                        <TSSubCardList/>
                    </View>
                </View>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    cardConatiner: {
        width: 400,
        maxWidth: '100%',
        paddingBottom: 10
    },

});

export default TravelSettleCard;