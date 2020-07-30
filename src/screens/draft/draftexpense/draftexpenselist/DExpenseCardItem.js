import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DExpenseCard from './DExpenseCard';

import { colors, sizes, sizeRatio } from '../../../../utils/theme';
import NavigationService from '../../../../navigation/NavigationService';

const TravelIcon = require('../../../../assets/image/travel_grey.png');
const ListIcon = require('../../../../assets/image/list_grey.png');
const IndicatorIcon = require('../../../../assets/image/red_indicator.png');
const AttachmentIcon = require('../../../../assets/image/attachment.png');

import { IconStyle } from '../../../../utils/IconStyle';

const DExpenseCardItem = props => {


    let typeIcon;
    if (props.cardData.item.type === 'voucher') {
        typeIcon = <View><Image source={ListIcon} style={IconStyle.largeXIcon} /></View>;
    } else if (props.cardData.item.type === 'travel') {
        typeIcon = <View><Image source={TravelIcon} style={IconStyle.largeXIcon} /></View>;
    }

    let indicator;
    indicator = <Image source={IndicatorIcon} style={IconStyle.tinyXIcon} />;

    let attachment;
    attachment = <Image source={AttachmentIcon} style={IconStyle.smallIcon} />;

    const onItemClickHandler = () => {
        NavigationService.navigate('DraftDetails', { itemData: props.cardData.item });
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onItemClickHandler}>
            <View style={styles.rootContainer}>
                <DExpenseCard style={styles.cardConatiner}>
                    <View style={styles.itemRoot}>
                        {typeIcon}
                        <View style={{ marginStart: 14, width: '100%', flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '100%', flex: 1 }}>
                                    <Text style={{ fontSize: sizes.font_16 }} numberOfLines={1} ellipsizeMode='tail'>{props.cardData.item.title}</Text>
                                </View>
                                {props.cardData.item.redDot ? indicator : null}
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ color: colors.textGrey, fontSize: sizes.font_14 }}>{props.cardData.item.name}</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '100%', flex: 1 }}>
                                        <Text style={{ color: colors.textGrey, fontSize: sizes.font_14 }}>{props.cardData.item.date}</Text>
                                    </View>
                                    <View style={{ marginRight: 10 }}>
                                        {props.cardData.item.isAttachment ? attachment : null}
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: sizes.font_14 }}>{props.cardData.item.rupees}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </DExpenseCard>
            </View>
        </TouchableOpacity>
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
});

export default DExpenseCardItem;