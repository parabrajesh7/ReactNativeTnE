import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, AsyncStorage } from 'react-native';

import ExpenseCardItem from './ExpenseCardItem';
import { colors, sizes, sizeRatio } from '../../../utils/theme';


import { NavigationEvents } from 'react-navigation';

let renderFlag = false;

const ExpenseList = props => {

    const [showList, setShowList] = useState(false);
    const [refreshList, setRefreshList] = useState(false);

    let displayList;
    let loading;

    let expenseListData = [];
    
    let jsonList = new Object();
    //let expenseMonth = CommonUtils.convertMonth(row.expDate.substring(5, 7));
    //let expenseDate = row.expDate.substring(8, 10);
    let expenseMonth = 'Dec';
    let expenseDate = '21';
    
    jsonList['id'] = '1';
    jsonList['expenseMonth'] = expenseMonth;
    jsonList['expenseDate'] = expenseDate;
    jsonList['expenseNarration'] = 'Narration will be displayed here...';
    jsonList['isAttachment'] = 'Y';
    jsonList['expenseAmount'] = '2000';
    jsonList['expenseCurrency'] = 'INR';

    expenseListData.push(jsonList);

    displayList = <FlatList
        data={expenseListData}
        extraData={refreshList}
        renderItem={({ item }) => (
            <ExpenseCardItem
                expenseData={item} />
        )}
        keyExtractor={item => item.id} />

    
    loading = <Text>Loading...</Text>

    return (
        <View style={styles.rootContainer}>
            {displayList}
        </View>
    );

}

const styles = StyleSheet.create({

    rootContainer: {
        backgroundColor: colors.white,
        paddingBottom: 80
    }

});


export default ExpenseList;