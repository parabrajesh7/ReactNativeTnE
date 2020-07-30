import React, { useState } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import { ButtonGroup } from 'react-native-elements'

import Card from '../../../common/Card';
import CardTitle from './CardTitle';
import { colors, sizes, sizeRatio } from '../../../utils/theme';
import { IconStyle } from '../../../utils/IconStyle';
import CustomDivider from '../../../utils/CustomDivider';
import ESubCardList from './expensesubcard/ESubCardList';

const MoneyIcon = require('../../../assets/image/money_grey.png');
const ListIcon = require('../../../assets/image/list_grey.png');

const ExpenseCard = props => {

    const buttons = ['Quarter', 'Month', 'Week'];
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [rupees, setRupees] = useState('3526');
    const [vouchers, setVouchers] = useState('58');

    const updateIndex = (index) => {
        setSelectedIndex(index);
        switch(index) {
            case 0:
                setRupees('5340');
                setVouchers('20');
                break;

            case 1:
                setRupees('3256');
                setVouchers('58');
                break;
                
            case 2:
                setRupees('456');
                setVouchers('10');
                break;    
        }
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.addCardConatiner}>
                <View>
                    <CardTitle title={'EXPENSE'} showAction= {false} />
                    <View style={styles.contentContainer}>
                        <ButtonGroup
                            onPress={updateIndex}
                            selectedIndex={selectedIndex}
                            buttons={buttons}
                            textStyle={{fontSize: sizes.font_14}}
                            containerStyle={styles.buttonGroup}
                            selectedButtonStyle={styles.selectedButtonStyle}
                        />
                    </View>
                    <View style={styles.countContainer}>
                        <View style={styles.rnvContainer}>
                            <Image source={MoneyIcon} style={IconStyle.smallIcon} />
                            <Text style={{ ...styles.textStyle, marginStart: 8 }}>{rupees}</Text>
                            <Text style={{ ...styles.textStyle, marginStart: 3 }}>INR</Text>
                        </View>
                        <View style={{ ...styles.rnvContainer, marginStart: 30 }}>
                            <Image source={ListIcon} style={IconStyle.smallIcon} />
                            <Text style={{ ...styles.textStyle, marginStart: 8 }}>{vouchers}</Text>
                            <Text style={{ ...styles.textStyle, marginStart: 3 }}>Vouchers</Text>
                        </View>
                    </View>
                    <View style={styles.progressContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.progressText}>2152</Text>
                            <View style={{
                                ...styles.progressBar,
                                backgroundColor: colors.colorPending,
                                borderBottomLeftRadius: 10,
                                borderTopLeftRadius: 10,
                                width: 160
                            }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.progressText}>850</Text>
                            <View style={{
                                ...styles.progressBar,
                                backgroundColor: colors.colorUnpaid,
                                width: 60
                            }} />
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.progressText}>500</Text>
                            <View style={{
                                ...styles.progressBar,
                                backgroundColor: colors.colorPaid,
                                borderBottomRightRadius: 10,
                                borderTopRightRadius: 10,
                                width: 40
                            }} />
                        </View>
                    </View>
                    <View style={styles.legendContainer}>
                        <View style={styles.legendStyle}>
                            <View style={{ ...styles.legendBox, backgroundColor: colors.colorPending }} />
                            <Text style={styles.legendText}>PENDING</Text>
                        </View>
                        <View style={styles.legendStyle}>
                            <View style={{ ...styles.legendBox, backgroundColor: colors.colorUnpaid }} />
                            <Text style={styles.legendText}>UNPAID</Text>
                        </View>
                        <View style={styles.legendStyle}>
                            <View style={{ ...styles.legendBox, backgroundColor: colors.colorPaid }} />
                            <Text style={styles.legendText}>PAID</Text>
                        </View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <CustomDivider bg={colors.grayLight} topMargin={20} />
                    </View>
                    <ESubCardList/>
                </View>
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    addCardConatiner: {
        width: 400,
        maxWidth: '100%',
        paddingBottom: 20
    },
    contentContainer: {
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 10,
        alignItems: 'center'
    },
    expenseTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignSelf: 'baseline',
        borderColor: colors.border,
        borderWidth: 1,
        padding: 5,
        borderRadius: 10
    },
    expenseTypeText: {
        fontSize: 16,
        fontWeight: '200',
        paddingStart: 10,
        paddingEnd: 10,
    },
    buttonGroup: {
        width: '75%',
        height: 35,
        borderRadius: 10,
        borderColor: colors.border,
    },
    selectedButtonStyle: {
        backgroundColor: colors.pri,
    },
    countContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
        alignItems: 'center'
    },
    rnvContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: colors.textSecDark,
        fontSize: sizes.font_16
    },
    progressContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    progressText: {
        fontSize: sizes.font_14,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBar: {
        height: 12,
        marginTop: 5
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    legendStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    legendText: {
        fontSize: sizes.font_12,
        marginLeft: 10,
        color: colors.gray
    },
    legendBox: {
        width: 12,
        height: 12
    }


});

export default ExpenseCard;