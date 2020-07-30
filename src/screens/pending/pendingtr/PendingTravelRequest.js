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

import PendingTRItem from './list/PendingTRItem'

import NavigationService from '../../../navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';

import Modal from "react-native-simple-modal";

import { SwipeListView } from 'react-native-swipe-list-view';

const DATA = [
    {
        key: '0',
        title: 'Trip Request to Ahmedabad',
        type: 'travel',
        name: 'Mumbai - Ahmedabad',
        date: '24 Aug - 03 Sep',
        rupees: '145.55 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: true
    },
    {
        key: '1',
        title: 'Client Meeting at Kolkatta',
        type: 'travel',
        name: 'Mumbai - Kolkatta',
        date: '24 Aug - 03 Sep',
        rupees: '688.55 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: false
    },
    {
        key: '2',
        title: 'Pune Cab Travel',
        type: 'travel',
        name: 'Gaurank Yadav',
        date: 'Mumbai - Pune',
        rupees: '445.45 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: false
    },
    {
        key: '3',
        title: 'Europe visit',
        type: 'travel',
        name: 'Priyank Gupta',
        date: 'Mumbai - Sweden',
        rupees: '546.78 INR',
        currency: 'INR',
        isAttachment: false,
        redDot: true
    },
];

class PendingTravelRequest extends Component {

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
                                <Title>Pending Travel Request</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>

                            </Right>
                        </Header>
                        <Content>
                            <View style={{ padding: 5 }}>
                                <SwipeListView
                                    data={DATA}
                                    renderItem={(data, rowMap) => (
                                        <PendingTRItem
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
        margin: 10,
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
        paddingRight: 25,
        paddingLeft: 25,
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

export default PendingTravelRequest;


{/* <FlatList
    data={DATA}
    renderItem={({ item }) => (
        <DExpenseCardItem
            cardData={item} />
    )}
/> */}