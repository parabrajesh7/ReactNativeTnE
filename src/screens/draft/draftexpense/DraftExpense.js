import React, { useState, Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ToastAndroid,
    Alert,
    AsyncStorage,
    BackHandler,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';

import {
    Container,
    Header,
    Icon,
    Button,
    Body,
    Content,
    Left,
    Right,
    Title,
    Fab,
    Toast,
    Picker,
    Root
} from 'native-base';
import { colors, sizes, sizeRatio } from '../../../utils/theme';

import Loader from "../../../utils/Loader";

import { IconStyle } from '../../../utils/IconStyle';
const DoneIcon = require('../../../assets/image/done.png');
const ApprovalIcon = require('../../../assets/image/approval.png');
const CalendarIcon = require('../../../assets/image/calendar.png');

import DExpenseCardItem from './draftexpenselist/DExpenseCardItem'

import NavigationService from '../../../navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';

import Modal from "react-native-simple-modal";

import { SwipeListView } from 'react-native-swipe-list-view';

const DATA = [
    {
        key: '0',
        title: 'Food at Mall on Highway',
        type: 'voucher',
        name: 'Rajesh Sharma',
        date: '24 Aug - 03 Sep',
        rupees: '145.55 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },
    {
        key: '1',
        title: 'Travel to Client Side',
        type: 'voucher',
        name: 'Kunal Patel',
        date: '24 Aug - 03 Sep',
        rupees: '688.55 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: true
    },
    {
        key: '2',
        title: 'Train Ticket booking',
        type: 'voucher',
        name: 'Gaurank Yadav',
        date: '24 Aug - 03 Sep',
        rupees: '445.45 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },
    {
        key: '3',
        title: 'Trip Request for Ahmedabad',
        type: 'voucher',
        name: 'Priyank Gupta',
        date: '24 Aug - 03 Sep',
        rupees: '546.78 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: true
    },
    {
        key: '4',
        title: 'Client meeting at Kolkatta',
        type: 'voucher',
        name: 'Priyank Gupta',
        date: '24 Aug - 03 Sep',
        rupees: '600.20 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },

];

class DraftExpense extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
        }

        this.closeDraftExpenseHandler = this.closeDraftExpenseHandler.bind(this);
    }

    closeDraftExpenseHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');
    }

    render() {
        const { context } = this.state;
        return (
            <Root>
                <Container>
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => context.closeDraftExpenseHandler()}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Draft Expenses</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>

                            </Right>
                        </Header>
                        <Content>
                            <View style={{ padding: 5 }}>
                                <SwipeListView
                                    data={DATA}
                                    renderItem={(data, rowMap) => (
                                        <DExpenseCardItem
                                            cardData={data} />
                                    )}
                                    renderHiddenItem={(data, rowMap) => (
                                        <View style={styles.rowBack}>
                                            
                                            <View style={styles.rejectButtonContainer}>
                                                <Text style={styles.hiddenButtonText}>Reject</Text>
                                            </View>
                                            <View style={styles.approveButtonContainer}>
                                                <Text style={styles.hiddenButtonText}>Approve</Text>
                                            </View>
                                        </View>
                                    )}
                                    stopLeftSwipe = {5}
                                    swipeToOpenPercent = {10}
                                    swipeToClosePercent = {10}
                                    leftOpenValue={0}
                                    rightOpenValue={-180}
                                />
                            </View>
                        </Content>
                    </View>
                </Container>
            </Root>
        )
    }

}

const styles = StyleSheet.create({
    rowBack: {
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 12,
        borderRadius: 5
    },
    rejectButtonContainer: {
        backgroundColor: '#E95757',
        paddingRight: 30,
        paddingLeft: 30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    approveButtonContainer: {
        backgroundColor: colors.colorPaid,
        paddingRight: 22,
        paddingLeft: 22,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 2
    },
    hiddenButtonText: {
        color: colors.white,
        fontWeight: '600',
        fontSize: sizes.font_14
    }
});

export default DraftExpense;


{/* <FlatList
    data={DATA}
    renderItem={({ item }) => (
        <DExpenseCardItem
            cardData={item} />
    )}
/> */}