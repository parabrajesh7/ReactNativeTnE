import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    AsyncStorage,
    FlatList
} from 'react-native';

import Card from '../../../common/Card';
import ApprovalCardItem from './approvaldata/ApprovalCardItem'
import CardTitle from './CardTitle';
import { colors, sizes, sizeRatio } from '../../../utils/theme';

import NavigationService from '../../../navigation/NavigationService';


const DATA = [
    {
        id: '0',
        title: 'Food at Mall on Highway',
        type: 'voucher',
        name: 'Rajesh Sharma',
        date: '24 Aug - 03 Sep',
        rupees: '22.55 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },
    {
        id: '1',
        title: 'Travel to Client Side',
        type: 'voucher',
        name: 'Kunal Patel',
        date: '24 Aug - 03 Sep',
        rupees: '181.55 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: true
    },
    {
        id: '2',
        title: 'Train Ticket booking',
        type: 'voucher',
        name: 'Gaurank Yadav',
        date: '24 Aug - 03 Sep',
        rupees: '181.55 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },
    {
        id: '3',
        title: 'Trip Request for Ahmedabad',
        type: 'travel',
        name: 'Mumbai - Ahmedabad',
        date: '24 Aug - 03 Sep',
        rupees: '14055 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: true
    },
    {
        id: '4',
        title: 'Client meeting at Kolkatta',
        type: 'travel',
        name: 'Mumbai - Kolkatta',
        date: '24 Aug - 03 Sep',
        rupees: '25000 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: false
    },

];


const ApprovalCard = props => {

    return (
        <View style={styles.screen}>
            <Card style={styles.cardConatiner}>
                <View>
                    <CardTitle title={'APPROVAL (32)'} showAction={true} />
                    <View style={{ padding: 5 }}>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                                <ApprovalCardItem
                                    cardData={item}/>
                            )}
                        />
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

export default ApprovalCard;