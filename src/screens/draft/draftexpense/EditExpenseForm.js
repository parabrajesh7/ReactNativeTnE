import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    ScrollView,
    AsyncStorage,
    ToastAndroid
} from 'react-native';

import { Toast, Root } from 'native-base';

import { colors, sizes, sizeRatio } from '../../../utils/theme';

const CalendarIcon = require('../../../assets/image/calendar.png');
const SampleReceipt = require('../../../assets/image/sample_receipt.png');

import { IconStyle } from '../../../utils/IconStyle';

import ExpenseDatePicker from '../../expense/ExpenseDatePicker';

import { Picker, Fab, Icon } from 'native-base';

const EditExpenseForm = props => {

    const convertDate = (str) => {
        let date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        let value1 = [date.getFullYear(), mnth, day].join("/"); // returns -- > 2019/12/18
        let value2 = [mnth, day, date.getFullYear()].join("/"); // returns -- > 12/18/2019 
        return value2;
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [expenseDate, setExpenseDate] = useState(convertDate(new Date()));
    const [expenseName, setExpenseName] = useState('');
    const [location, setLocation] = useState('');
    const [currency, setCurrency] = useState('');

    const [inputFromValue, setInputFromValue] = useState('');
    const [inputToValue, setInputToValue] = useState('');
    const [inputUnitValue, setInputUnitValue] = useState('');
    const [inputAmountValue, setInputAmountValue] = useState('');
    const [inputNarrationValue, setInputNarrationValue] = useState('');

    let expenseNameData = [
        { expenseName: 'Select Expense Name', expenseId: '-1' },
        { expenseName: '2 wheeler', expenseId: '1' },
        { expenseName: '4 wheeler diesel', expenseId: '2' },
        { expenseName: '4 wheeler petrol', expenseId: '3' },
        { expenseName: 'Agency training Expenses', expenseId: '4' },
        { expenseName: 'Air Ticket - Dom', expenseId: '5' },
        { expenseName: 'Airfare Domestic', expenseId: '6' },
        { expenseName: 'Airfare Int', expenseId: '7' }
    ];

    let currencyData = [
        { currencyName: 'Select Currency', currencyId: '-1' },
        { currencyName: 'INR', currencyId: '1' },
        { currencyName: 'USD', currencyId: '2' },
        { currencyName: 'Euro', currencyId: '3' },
        { currencyName: 'AED', currencyId: '4' },
        { currencyName: 'AUD', currencyId: '5' },
        { currencyName: 'CAD', currencyId: '6' },
        { currencyName: 'EGP', currencyId: '7' }
    ];

    let locationData = [
        { value: 'Mumbai', id: 1 },
        { value: 'Pune', id: 2 },
        { value: 'Nashik', id: 3 }
    ];

    const modalVisibilityHandler = () => {
        setIsModalVisible(!isModalVisible);
        Keyboard.dismiss();
    }

    const setExpenseDateHandler = (expenseDate) => {
        setExpenseDate(convertDate(expenseDate));
    }

    const ENPickerValueChangeHandler = (value) => {

        setExpenseName(value);
    }

    const inputFromHandler = (value) => {
        setInputFromValue(value);
    }

    const inputToHandler = (value) => {
        setInputToValue(value);
    }

    const inputUnitHandler = (value) => {
        setInputUnitValue(value);
    }

    const inputAmountHandler = (value) => {
        setInputAmountValue(value);
    }

    const inputNarrationHandler = (value) => {
        setInputNarrationValue(value);
    }

    const currencyHandler = (value) => {
        setCurrency(value);
    }

    let expenseDatePicker;

    if (isModalVisible) {
        expenseDatePicker = <ExpenseDatePicker
            pickerTitle={'Select Expense Date'}
            pickerVisibility={isModalVisible}
            togglePicker={modalVisibilityHandler}
            dateHandler={setExpenseDateHandler}
            date={expenseDate} />;
    }

    return (
        <Root>
            <View style={styles.screen}>
                <View style={styles.formContainer}>
                    <Image
                        source={SampleReceipt}
                        style={styles.previewImage} />
                    <View style={{ ...styles.rowStyle, marginTop: 24 }}>
                        <Text style={styles.text}>Expense Date:</Text>
                        <TouchableOpacity onPress={() => { modalVisibilityHandler() }}>
                            <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ ...styles.dateText, color: colors.black, }}>{expenseDate}</Text>
                                <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                        <Text style={styles.text}>Expense Name:</Text>
                        <View style={{ ...styles.dropDownContainer }}>
                            <Picker
                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }], height: 40, marginBottom: 14 }}
                                iosHeader="Expense Name"
                                Header="Expense Name"
                                mode="dropdown"
                                placeholder='Select Expense Name'
                                headerBackButtonText='Back'
                                selectedValue={expenseName}
                                onValueChange={(value) => { ENPickerValueChangeHandler(value) }}>

                                {expenseNameData.map((name, i) => {
                                    return (
                                        <Picker.Item label={name.expenseName} value={name.expenseId} key={i} />
                                    );
                                }
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>From:</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            value={inputFromValue}
                            returnKeyType={'next'}
                            onChangeText={inputFromHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>To:</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            value={inputToValue}
                            returnKeyType={'next'}
                            onChangeText={inputToHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>Unit:</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            value={inputUnitValue}
                            returnKeyType={'next'}
                            onChangeText={inputUnitHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>Amount:</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            value={inputAmountValue}
                            returnKeyType={'next'}
                            keyboardType={'number-pad'}
                            onChangeText={inputAmountHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>Currency:</Text>
                        <View style={{ ...styles.dropDownContainer }}>
                            <Picker
                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }], height: 40, marginBottom: 14 }}
                                iosHeader="Currency"
                                Header="Currency"
                                mode="dropdown"
                                placeholder='Select Currency'
                                headerBackButtonText='Back'
                                selectedValue={currency}
                                onValueChange={(value) => { currencyHandler(value) }}>

                                {currencyData.map((currency, i) => {
                                    return (
                                        <Picker.Item label={currency.currencyName} value={currency.currencyId} key={i} />
                                    );
                                }
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>Narration:</Text>
                        <TextInput
                            style={styles.input}
                            editable={true}
                            value={inputNarrationValue}
                            returnKeyType={'next'}
                            onChangeText={inputNarrationHandler} />
                    </View>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(false);
                    }}>
                    <View style={{
                        marginTop: 'auto',
                        marginBottom: 'auto', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {expenseDatePicker}
                    </View>
                </Modal>
            </View>
        </Root>
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        paddingTop: 12
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: sizes.font_14,
        backgroundColor: colors.default_input_field,
        color: colors.black,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 5,
    },
    text: {
        fontSize: sizes.font_14,
        width: 115,
        maxWidth: '100%',
    },
    dateText: {
        fontSize: sizes.font_14,
        paddingTop: 10,
        paddingBottom: 10
    },
    dropDownContainer: {
        flex: 1,
        height: '70%',
        backgroundColor: colors.default_input_field,
        borderRadius: 5,
    },
    dropDownStyle: {
        width: 215,
        height: 40,
    },
    imageContainer: {
        margin: 5,
        height: '50%',
        flex: 1,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Only for Android
        backgroundColor: 'white',
        borderRadius: 15
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        borderColor: colors.grayDark,
        borderWidth: 0.5,
        backgroundColor: colors.lightGray,
    },
});

export default EditExpenseForm;