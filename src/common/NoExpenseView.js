import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, sizes } from '../utils/theme';

const NoExpenseView = props => {

    return (
        <View style={styles.noExpenseContainer}>
            <Text style={styles.noExpense}>NO EXPENSES</Text>
        </View>
    );

}

const styles = StyleSheet.create({

    noExpenseContainer: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    noExpense: {
        fontSize: sizes.font_18,
        color: colors.lightGray
    }

});

export default NoExpenseView;

