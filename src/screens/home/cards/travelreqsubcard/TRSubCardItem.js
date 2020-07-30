import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TRSubCard from './TRSubCard';

import { colors, sizes, sizeRatio } from '../../../../utils/theme';

import NavigationService from '../../../../navigation/NavigationService';

const MoneyIcon = require('../../../../assets/image/money.png');
const TravelIcon = require('../../../../assets/image/travel_white.png');
import { IconStyle } from '../../../../utils/IconStyle';

const TRSubCardItem = props => {

    const onItemClickHandler = () => {
        switch (props.title) {

            case 'DRAFT':
                NavigationService.navigate('DraftTR');
                break;

            case 'PENDING':
                NavigationService.navigate('PendingTravelRequest');
                break;

        }
    }

    return (
        <View style={styles.rootContainer}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onItemClickHandler}>
                <TRSubCard style={styles.cardConatiner} cardColor={props.cardColor}>
                    <View style={styles.itemRoot}>
                        <Text style={styles.itemText}>{props.title}</Text>
                        <View style={styles.subItemContainer}>
                            <Image source={TravelIcon} style={IconStyle.smallIcon} />
                            <Text style={{ ...styles.subItemText, marginStart: 8 }}>{props.vouchers}</Text>
                            {/* <Text style={{ ...styles.subItemText, marginStart: 3 }}>Vouchers</Text> */}
                        </View>
                        <View style={styles.subItemContainer}>
                            <Image source={MoneyIcon} style={IconStyle.smallIcon} />
                            <Text style={{ ...styles.subItemText, marginStart: 8 }}>{props.rupees}</Text>
                            <Text style={{ ...styles.subItemText, marginStart: 3 }}>INR</Text>
                        </View>
                    </View>
                </TRSubCard>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        paddingLeft: 16,
        paddingBottom: 5,
    },
    cardConatiner: {
        width: '100%',
        flex: 1,
        maxWidth: '100%',
        paddingBottom: 10,
    },
    itemRoot: {
        paddingLeft: 16,
        paddingRight: 80,
        paddingTop: 25,
        paddingBottom: 5,
        marginRight: 10
    },
    itemText: {
        fontSize: sizes.font_16,
        color: colors.white
    },
    subItemContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
    },
    subItemText: {
        color: colors.white,
        fontSize: sizes.font_14
    }

});

export default TRSubCardItem;