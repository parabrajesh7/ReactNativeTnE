import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Card from '../../../common/Card';
import CardTitle from './CardTitle';
import { colors, sizes, sizeRatio } from '../../../utils/theme';

import NavigationService from '../../../navigation/NavigationService';

const Camera = require('../../../assets/image/camera.png');
const Expense = require('../../../assets/image/expense.png');
const TravelRequest = require('../../../assets/image/travelreq.png');
const TravelSettlement = require('../../../assets/image/travel_settle_01.png');

import { Cache } from "react-native-cache";
import CacheKeys from "../../../database/CacheKeys";

//import FilePickerManager from 'react-native-file-picker';

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

class AddCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            context: this,
        }
    }


    expenseButtonHandler = () => {
        
        console.log('Business Expense');
        NavigationService.navigate('BusinessExpense');
        // cache.setItem(CacheKeys.IS_EXPENSE_ADDED, false, function (err) {
        //     NavigationService.navigate('BusinessExpense', { expenseAdded: 0 });
        // });
    }

     scanReceiptHandler = () => {
        console.log('Scan Receipt');
        NavigationService.navigate('ScanReceipt');
    }

     travelRequestHandler = () => {
        console.log('Travel Request');
        NavigationService.navigate('TravelRequest');
    }

    //  options = {
    //     title: 'File Picker',
    //     chooseFileButtonTitle: 'Choose File...'
    // };

     travelSettlementHandler = () => {
        console.log('Travel Settlement');
        NavigationService.navigate('TravelSettlement');
        // FilePickerManager.showFilePicker(options, (response) => {
        //     console.log('Response = ', response);

        //     if (response.didCancel) {
        //         console.log('User cancelled file picker');
        //     }
        //     else if (response.error) {
        //         console.log('FilePickerManager Error: ', response.error);
        //     }
        //     else {
        //         console.log('FilePickerManager Response: ', response);
        //     }
        // });
    }

    render(){
        const { context } = this.state;
        return (
            <View style={styles.screen}>
                <Card style={styles.addCardConatiner}>
                    <View>
                        <CardTitle title={'ADD'} showAction={false} />
                        <View style={styles.optionsContainer}>
                            <View style={styles.optionsRow}>
                                <View style={styles.singleOption}>
                                    <TouchableOpacity
                                        onPress={() => context.scanReceiptHandler()}>
                                        <View style={{ ...styles.optionStyle, backgroundColor: '#AED8C9' }}>
                                            <Image source={Camera} style={styles.optionIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.optionLabel}>Scan Receipt</Text>
                                </View>
                                <View style={styles.singleOption}>
                                    <TouchableOpacity
                                        onPress={() => context.expenseButtonHandler()}>
                                        <View style={{ ...styles.optionStyle, backgroundColor: '#D5C9AA' }}>
                                            <Image source={Expense} style={styles.optionIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.optionLabel}>Expense</Text>
                                </View>
                            </View>
                            <View style={{ ...styles.optionsRow, marginTop: 20 }}>
                                <View style={styles.singleOption}>
                                    <TouchableOpacity
                                        onPress={() => context.travelRequestHandler()}>
                                        <View style={{ ...styles.optionStyle, backgroundColor: '#AACBD5' }}>
                                            <Image source={TravelRequest} style={styles.optionIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.optionLabel}>Travel Request</Text>
                                </View>
                                <View style={styles.singleOption}>
                                    <TouchableOpacity
                                        onPress={() => context.travelSettlementHandler()}>
                                        <View style={{ ...styles.optionStyle, backgroundColor: '#D5AAAA' }}>
                                            <Image source={TravelSettlement} style={styles.optionIcon} />
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={styles.optionLabel}>Travel Settlement</Text>
                                </View>
    
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    addCardConatiner: {
        width: 400,
        maxWidth: '100%',
        paddingBottom: 10
    },
    optionsContainer: {
        padding: 16
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    optionStyle: {
        width: 90,
        height: 90,
        borderRadius: 200,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    singleOption: {
        alignItems: 'center'
    },
    optionLabel: {
        marginTop: 10,
        fontSize: sizes.font_14,
        color: 'black',
    },
    optionIcon: {
        height: sizes.font_12 + 20,
        width: sizes.font_12 + 20,
    }

});

export default AddCard;