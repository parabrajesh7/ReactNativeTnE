import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TSSubCard from './TSSubCard';

import { colors, sizes, sizeRatio } from '../../../../utils/theme';

const MoneyIcon = require('../../../../assets/image/money.png');
const TravelIcon = require('../../../../assets/image/travel_white.png');
import { IconStyle } from '../../../../utils/IconStyle';

const TSSubCardItem = props => {
    return (
        <View style={styles.rootContainer}>
            <TSSubCard style={styles.cardConatiner} cardColor={props.cardColor}>
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
            </TSSubCard>
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

export default TSSubCardItem;