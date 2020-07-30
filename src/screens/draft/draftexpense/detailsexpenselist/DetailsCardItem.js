import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { colors, sizes, sizeRatio } from '../../../../utils/theme';

import { IconStyle } from '../../../../utils/IconStyle';
const AttachmentIcon = require('../../../../assets/image/attachment.png');

import ExpenseCard from '../../../../common/ExpenseCard';

const DetailsCardItem = props => {

    let attachmentIcon;

    const [currency, setCurrency] = useState('');
    const [isAttachment, setIsAttachment] = useState(false);

    attachmentIcon = <Image source={AttachmentIcon} style={IconStyle.smallIcon} />
    

    return (
        <View style={styles.rootContainer}>
            <ExpenseCard style={styles.cardConatiner}>
                <View style={styles.itemRoot}>
                    <View style={styles.dateBox}>
                        <View style={styles.monthContainer}>
                            <Text style={styles.monthText}>{props.cardData.item.expenseMonth}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>{props.cardData.item.expenseDate}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: 8, marginRight: 5, flex: 4, alignItems: 'flex-start' }}>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.titleText} numberOfLines={1} ellipsizeMode='tail' >{props.cardData.item.expenseNarration}</Text>
                            </View>
                            <View style={{ marginTop: 18 }}>
                                {props.cardData.item.isAttachment ? attachmentIcon : null}
                            </View>
                        </View>
                    </View>
                    <View style={{ width: 1, backgroundColor: colors.lightGray, marginTop: 8, marginBottom: 8 }} />
                    <View style={{ flex: 1, paddingLeft: 12, paddingRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                        <View>
                            <Text style={styles.currencyStyle}>{props.cardData.item.expenseAmount}</Text>
                        </View>
                        <View>
                            <Text style={styles.currencyStyle}>{props.cardData.item.expenseCurrency}</Text>
                        </View>
                    </View>
                </View>
            </ExpenseCard>
        </View>
    );

}

const styles = StyleSheet.create({

    rootContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    cardConatiner: {
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#ECECEC',
        borderRadius: 2
    },
    itemRoot: {
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
    },
    dateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#D5AAAA',
    },
    monthContainer: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#CD8080',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    monthText: {
        fontSize: sizes.font_14,
        fontWeight: 'bold'
    },
    dateContainer: {
        padding: 12,
        width: '100%',
        backgroundColor: '#D5AAAA',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        alignItems: 'center'
    },
    dateText: {
        fontSize: sizes.font_14,
        fontWeight: 'bold'
    },
    titleText: {
        fontSize: sizes.font_16,
    },
    currencyStyle: {
        fontSize: sizes.font_14,
        
    }

});


export default DetailsCardItem;