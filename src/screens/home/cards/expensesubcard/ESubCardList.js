import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import ESubCardItem from './ESubCardItem';
import { colors } from '../../../../utils/theme';

const DATA = [
    {
        id: '0',
        title: 'DRAFT',
        vouchers: '5',
        rupees: '585',
        color: colors.colorPaid,
    },
    {
        id: '1',
        title: 'PENDING',
        vouchers: '28',
        rupees: '2152',
        color: colors.colorPending,
    },

];

const ESubCardList = props => {
    return (
        <View style={styles.rootConatiner}>
            <FlatList
                horizontal={true}
                data={DATA}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item }) => (
                    <ESubCardItem
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

export default ESubCardList;

