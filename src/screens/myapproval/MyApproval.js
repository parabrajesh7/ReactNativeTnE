import React, { useState, Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ScrollView
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
import { colors, sizes, sizeRatio } from '../../utils/theme';

import { IconStyle } from '../../utils/IconStyle';

import ApprovalCardItem from '../../screens/home/cards/approvaldata/ApprovalCardItem'
import TravelListItem from './TravelListItem'

import { ButtonGroup } from 'react-native-elements'

let buttons = ['EXPENSE', 'TRAVEL', 'SETTLEMENT'];
let list;

const ExpenseData = [
    {
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
        title: 'Client meeting at Kolkatta',
        type: 'voucher',
        name: 'Priyank Gupta',
        date: '24 Aug - 03 Sep',
        rupees: '600.20 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },
    {
        id: '5',
        title: 'Train Ticket',
        type: 'voucher',
        name: 'Priyank Gupta',
        date: '24 Aug - 03 Sep',
        rupees: '800.20 INR',
        currency: 'INR',
        isAttachment: true,
        redDot: false
    },

];

const TravelData = [
    {
        id: '0',
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
        id: '1',
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
        id: '2',
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
        id: '3',
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

class MyApproval extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
            selectedIndex: 0,
        }

        list = <FlatList
                data = {ExpenseData}
                renderItem = {({ item }) => (
                    <ApprovalCardItem
                        cardData={item} />
                )}
                keyExtractor={item => item.id}/>;

    }

    closeHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');
    }

    updateIndex = (index) => {
        this.setState({ selectedIndex: index });

        switch(index) {

            case 0:
                list = <FlatList
                data = {ExpenseData}
                renderItem = {({ item }) => (
                    <ApprovalCardItem
                        cardData={item} />
                )}
                keyExtractor={item => item.id}/>;
                break;

            case 1:
                list = <FlatList
                data = {TravelData}
                renderItem = {({ item }) => (
                    <TravelListItem
                        cardData={item} />
                )}
                keyExtractor={item => item.id}/>;
                break;
                
            case 2:
                list = <View style={{justifyContent:'center', alignItems: 'center', flex: 1}}>
                    <Text style={styles.emptyList}>NO SETTLEMENT</Text></View>;
                break;    

        }
    }

    render() {
        const { context, selectedIndex } = this.state;

        return (
            <Root>
                <Container>
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => context.closeHandler()}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>My Approval</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>

                            </Right>
                        </Header>
                        <View style={{ flex: 1 }}>
                            <View style={styles.buttonGroupContainer}>
                                <ButtonGroup
                                    textStyle = {{fontSize: sizes.fontSm + 2}}
                                    onPress={(value) => context.updateIndex(value)}
                                    selectedIndex={selectedIndex}
                                    buttons={buttons}
                                    textStyle={{fontSize: sizes.font_12}}
                                    containerStyle={styles.buttonGroup}
                                    selectedButtonStyle={styles.selectedButtonStyle}
                                />
                            </View>
                            <View style={{ paddingTop: 10, flex: 1, height: '100%' }}>
                                {list}
                            </View>
                        </View>
                    </View>
                </Container>
            </Root>
        );
    }

}

const styles = StyleSheet.create({

    buttonGroupContainer: {
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 0,
        paddingTop: 10,
        alignItems: 'center'
    },
    buttonGroup: {
        fontSize: sizes.font_18,
        borderRadius: 10,
        borderColor: colors.border,
    },
    selectedButtonStyle: {
        backgroundColor: colors.pri,
    },
    emptyList: {
        fontSize: sizes.font_18,
        color: colors.lightGray
    }

});

export default MyApproval;