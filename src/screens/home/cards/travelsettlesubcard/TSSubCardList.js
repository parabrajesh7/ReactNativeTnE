import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import TSSubCardItem from './TSSubCardItem';
import { colors } from '../../../../utils/theme';

const DATA = [
    {
        id: '0',
        title: 'DRAFT',
        vouchers: '5',
        rupees: '20000',
        color: colors.colorPaid,
    },
    {
        id: '1',
        title: 'PENDING',
        vouchers: '6',
        rupees: '2200',
        color: colors.colorPending,
    },

];

const TSSubCardList = props => {
    return (
        <View style={styles.rootConatiner}>
            <FlatList
                horizontal={true}
                data={DATA}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item }) => (
                    <TSSubCardItem
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

export default TSSubCardList;

