import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import TRSubCardItem from './TRSubCardItem';
import { colors } from '../../../../utils/theme';

const DATA = [
    {
        id: '0',
        title: 'DRAFT',
        vouchers: '5',
        rupees: '2220',
        color: colors.colorPaid,
    },
    {
        id: '1',
        title: 'PENDING',
        vouchers: '5',
        rupees: '3800',
        color: colors.colorPending,
    },

];

const TRSubCardList = props => {
    return (
        <View style={styles.rootConatiner}>
            <FlatList
                horizontal={true}
                data={DATA}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item }) => (
                    <TRSubCardItem
                        title={item.title}
                        vouchers={item.vouchers}
                        rupees={item.rupees}
                        cardColor = {item.color}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rootConatiner: {
        paddingTop: 14,
        paddingRight: 10,
    }
});

export default TRSubCardList;

