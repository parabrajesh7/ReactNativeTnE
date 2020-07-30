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


import { IconStyle } from '../../../utils/IconStyle';

const ListIcon = require('../../../assets/image/list_grey.png');
const TravelIcon = require('../../../assets/image/travel_grey.png');
const IndicatorIcon = require('../../../assets/image/red_indicator.png');
const AttachmentIcon = require('../../../assets/image/attachment.png');

import DExpenseCard from '../draftexpense/draftexpenselist/DExpenseCard';
import DetailsCardItem from '../draftexpense/detailsexpenselist/DetailsCardItem'

import Modal from "react-native-simple-modal";

import { SwipeListView } from 'react-native-swipe-list-view';

let draftData;
let typeIcon;
let indicator;
let attachment;

const DATA = [
    {
        key: '0',
        expenseMonth: 'AUG',
        expenseDate: '24',
        expenseNarration: 'Metro Ticket to client',
        expenseAmount: '145',
        expenseCurrency: 'INR',
        isAttachment: true,
    },
    {
        key: '1',
        expenseMonth: 'AUG',
        expenseDate: '24',
        expenseNarration: 'Return Ticket',
        expenseAmount: '500',
        expenseCurrency: 'INR',
        isAttachment: true,
    },
    {
        key: '2',
        expenseMonth: 'AUG',
        expenseDate: '25',
        expenseNarration: 'Cab',
        expenseAmount: '145',
        expenseCurrency: 'INR',
        isAttachment: true,
    },
]

class DraftDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
        }

        this.openRowRefs = [];

        let jsonData = JSON.stringify(this.props.navigation.getParam('itemData', 'NO-DATA'));
        draftData = JSON.parse(jsonData);


        if (draftData.type === 'voucher') {
            typeIcon = <View><Image source={ListIcon} style={IconStyle.largeXIcon} /></View>;
        } else if (draftData.type === 'travel') {
            typeIcon = <View><Image source={TravelIcon} style={IconStyle.largeXIcon} /></View>;
        }
        indicator = <Image source={IndicatorIcon} style={IconStyle.tinyXIcon} />;
        attachment = <Image source={AttachmentIcon} style={IconStyle.smallIcon} />;

        this.closeDetailsHandler = this.closeDetailsHandler.bind(this);
    }

    closeDetailsHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('DraftExpense');
    }

    closeRow = (rowMap, rowKey) => {
        console.log('------ ROW MAP ------ : ' + rowMap[rowKey])
        if (rowMap[rowKey]) {
            console.log('-------- CLOSE ROW -------');
            rowMap[rowKey].closeRow();
        }
    }

    onItemClickHandler = (data, rowMap) => {
        console.log('-------- EDIT EXPENSE -------');
        const { navigate } = this.props.navigation;
        const { context } = this.state;
        //rowMap[data.item.id].closeRow();
        context.closeRow(rowMap, data.item.key);
        //console.log('-------- CLOSE ROW MAP & ITEM KEY : ' + rowMap[data.item.id] + "-" + data.item.id);
        navigate('EditExpense');
    }

   
    render() {
        const { context } = this.state;
        return (
            <Root>
                <Container>
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => context.closeDetailsHandler()}>
                                    <Icon name='arrow-back' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Details</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>

                            </Right>
                        </Header>
                        <Content>
                            <View style={{ flex: 1, paddingBottom: 10 }}>
                                <View style={{
                                    paddingLeft: 10, paddingRight: 10,
                                    paddingTop: 14, paddingBottom: 0
                                }}>
                                    <DExpenseCard style={styles.cardConatiner}>
                                        <View style={styles.itemRoot}>
                                            {typeIcon}
                                            <View style={{ marginStart: 14, width: '100%', flex: 1 }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                    <View style={{ width: '100%', flex: 1 }}>
                                                        <Text style={{ fontSize: sizes.font_16 }} numberOfLines={1} ellipsizeMode='tail'>{draftData.title}</Text>
                                                    </View>
                                                    {draftData.redDot ? indicator : null}
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <Text style={{ color: colors.textGrey, fontSize: sizes.font_14 }}>{draftData.name}</Text>
                                                </View>
                                                <View style={{ marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ width: '100%', flex: 1 }}>
                                                            <Text style={{ color: colors.textGrey, fontSize: sizes.font_14 }}>{draftData.date}</Text>
                                                        </View>
                                                        <View style={{ marginRight: 10 }}>
                                                            {draftData.isAttachment ? attachment : null}
                                                        </View>
                                                        <View>
                                                            <Text style={{ fontSize: sizes.font_14 }}>{draftData.rupees}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </DExpenseCard>
                                </View>

                                <SwipeListView
                                    useFlatList
                                    style={{ marginTop: 10 }}
                                    data={DATA}
                                    renderItem={(data, rowMap) => (
                                        
                                        <DetailsCardItem
                                            cardData={data} />
                                    )}
        
                                    renderHiddenItem={(data, rowMap) => (
                                        <View style={styles.rowBack}>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => context.onItemClickHandler(data, rowMap)}>
                                                <View style={styles.editButtonContainer}>
                                                    <Text style={styles.hiddenButtonText}>Edit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    stopLeftSwipe={10}
                                    swipeToOpenPercent={10}
                                    swipeToClosePercent={10}
                                    leftOpenValue={0}
                                    rightOpenValue={-80}
                                />
                            </View>
                        </Content>
                    </View>
                </Container>
            </Root>
        );
    }
}

const styles = StyleSheet.create({

    cardConatiner: {
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: colors.white,
        borderRadius: 2
    },
    itemRoot: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 12,
        borderRadius: 5
    },
    editButtonContainer: {
        backgroundColor: colors.colorPaid,
        paddingRight: 30,
        paddingLeft: 30,
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

export default DraftDetails;