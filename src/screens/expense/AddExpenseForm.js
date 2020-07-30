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

import { colors, sizes, sizeRatio } from '../../utils/theme';

const CalendarIcon = require('../../assets/image/calendar.png');
import { IconStyle } from '../../utils/IconStyle';

import ExpenseDatePicker from './ExpenseDatePicker';

import { Picker, Fab, Icon } from 'native-base';

let flagForUnitEnable = false;
let perUnitDetailsJSON = new Object();

const AddExpenseForm = props => {

    const { submit, accountHeadId, imageAttachment } = props;

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

    //---------------------------- TextInput - [From] -------------------------------------//
    const [inputFromState, setInputFromState] = useState(true); //Enable or Disable
    const [inputFromTextColor, setInputFromTextColor] = useState(colors.black);
    const [inputFromValue, setInputFromValue] = useState('');
    const [inputFromBgColor, setInputFromBgColor] = useState(colors.default_input_field);

    //---------------------------- TextInput - [To] -------------------------------------//
    const [inputToState, setInputToState] = useState(true); //Enable or Disable
    const [inputToTextColor, setInputToTextColor] = useState(colors.black);
    const [inputToValue, setInputToValue] = useState('');
    const [inputToBgColor, setInputToBgColor] = useState(colors.default_input_field);

    //---------------------------- TextInput - [Unit] -------------------------------------//
    const [inputUnitState, setInputUnitState] = useState(true); //Enable or Disable
    const [inputUnitTextColor, setInputUnitTextColor] = useState(colors.black);
    const [inputUnitValue, setInputUnitValue] = useState('');
    const [inputUnitBgColor, setInputUnitBgColor] = useState(colors.default_input_field);

    //---------------------------- TextInput - [Amount] -------------------------------------//
    const [inputAmountState, setInputAmountState] = useState(true); //Enable or Disable
    const [inputAmountTextColor, setInputAmountTextColor] = useState(colors.black);
    const [inputAmountValue, setInputAmountValue] = useState('');
    const [inputAmountBgColor, setInputAmountBgColor] = useState(colors.default_input_field);


    //---------------------------- TextInput - [Narration] -------------------------------------//
    const [inputNarrationState, setInputNarrationState] = useState(true); //Enable or Disable
    const [inputNarrationTextColor, setInputNarrationTextColor] = useState(colors.black);
    const [inputNarrationValue, setInputNarrationValue] = useState('');
    const [inputNarrationBgColor, setInputNarrationBgColor] = useState(colors.default_input_field);


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

    let expenseDatePicker;

    if (isModalVisible) {
        expenseDatePicker = <ExpenseDatePicker
            pickerTitle={'Select Expense Date'}
            pickerVisibility={isModalVisible}
            togglePicker={modalVisibilityHandler}
            dateHandler={setExpenseDateHandler}
            date={expenseDate} />;
    }

    const isZero = (object, messageContent) => {
        if (object === 0) {
            errorToast(messageContent + ' should be greater than 0.');
            return false;
        } else {
            return true;
        }
    }

    const isOnlyNumeric = (object, messageContent) => {
        if (object.search(/^[0-9]*$/) == -1) {
            errorToast(messageContent + " should be numeric.");
            return false;
        } else {
            return true;
        }
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

    const errorToast = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    const isNumber_optionalDot = (object, messageContent) => {
        if (isNaN(Number(object))) {
            errorToast(messageContent + " should be numeric.");
            return false;
        }
        return true;
    }

    const validateDetails = (exp_date, exp_from_loc, exp_to_loc, exp_narration,
        exp_unit, exp_amt, acc_head_id, exp_name_id, currency_id, file) => {

        //console.log('--> CURRENCY ID INSIDE validateDetails() : ' + currency_id);

        if (exp_date === "") {
            errorToast('Expense Date is invalid');
            return false;
        }
        if (acc_head_id === '-1') {
            errorToast('Account Head is invalid');
            return false;
        }
        if (exp_name_id === '-1' || exp_name_id === 'undefined') {
            console.log('--> EXPENSE ID >> -1')
            errorToast('Expense Name is invalid');
            return false;
        }
        if (flagForUnitEnable == true) {
            if (isZero(exp_unit, "Unit") == false) {
                setInputUnitValue('');
                return false;
            }
        }
        if (isZero(exp_amt, "Amount") == false) {
            setInputAmountValue('');
            return false;
        }

        if (perUnitDetailsJSON.expenseIsfromAndToReqd != 'N') {
            if (exp_from_loc == '') {
                errorToast('From Location is invalid');
                return false;
            }
            if (exp_to_loc == '') {
                errorToast('To Location is invalid');
                return false;
            }
        }

        if (perUnitDetailsJSON.expIsUnitReq == 'Y') {

            if (exp_unit != '') {
                if (isOnlyNumeric(exp_unit, "Unit") == false) {
                    return false;
                }

            } else {
                errorToast('Unit is invalid');
                return false;
            }
        }

        if (exp_amt != '') {
            if (isNumber_optionalDot(exp_amt, "Amount") == false) {
                return false;
            }

        } else {
            errorToast('Amount is invalid');
            return false;
        }

        if (currency_id == '-1') {
            errorToast('Currency Name is invalid');
            return false;
        }

        if (perUnitDetailsJSON.isAttachmentReq == 'Y') {

            if (file == "" || file == undefined) {
                errorToast('Attachment is mandatory.');
                return false;
            }
        }

        if (exp_narration == "") {
            errorToast('Narration is invalid');
            return false;
        }

        return true;

    }

    const resetSubmitButton = () => {
        props.reset(false);
    }

    if (submit === true) {
        //errorToast('Test');
        resetSubmitButton();

        props.saveSuccess();

    }

    const ENPickerValueChangeHandler = (value) => {
        console.log('--> Value recieved : ' + value);
        console.log('--> PICKER HANDLER --> ' + expenseName);
        setInputFromValue('');
        setInputToValue('');
        setInputUnitValue('');
        setInputAmountValue('');
        setInputNarrationValue('');

        setExpenseName(value);
    }

    const currencyHandler = (value) => {
        console.log('--> CURRENCY HANDLER >> ' + value);
        setCurrency(value);
    }

    return (
        <Root>
            <View style={styles.screen}>
                <View style={styles.formContainer}>
                    <View style={{ ...styles.rowStyle, marginTop: 10 }}>
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
                        <View style={{ ...styles.dropDownContainer}}>
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
                        <Text style={styles.text}>Location:</Text>
                        <View style={{ ...styles.dropDownContainer}}>
                            <Picker
                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }], height: 40, marginBottom: 14 }}
                                iosHeader="Location"
                                Header="Location"
                                mode="dropdown"
                                placeholder='Select Location'
                                headerBackButtonText='Back'
                                selectedValue={location}
                                onValueChange={(value) => { setLocation(value) }}>

                                {locationData.map((name, i) => {
                                    return (
                                        <Picker.Item label={name.value} value={name.id} key={i} />
                                    );
                                }
                                )}
                            </Picker>
                        </View>
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={[styles.text, { color: inputFromTextColor }]}>From:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputFromBgColor }]}
                            editable={inputFromState}
                            value={inputFromValue}
                            returnKeyType={'next'}
                            onChangeText={inputFromHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={[styles.text, { color: inputToTextColor }]}>To:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputToBgColor }]}
                            editable={inputToState}
                            value={inputToValue}
                            returnKeyType={'next'}
                            onChangeText={inputToHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={[styles.text, { color: inputUnitTextColor }]}>Unit:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputUnitBgColor }]}
                            editable={inputUnitState}
                            value={inputUnitValue}
                            returnKeyType={'next'}
                            keyboardType={'number-pad'}
                            onChangeText={inputUnitHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={[styles.text, { color: inputAmountTextColor }]}>Amount:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputAmountBgColor }]}
                            editable={inputAmountState}
                            value={inputAmountValue}
                            returnKeyType={'next'}
                            keyboardType={'number-pad'}
                            onChangeText={inputAmountHandler} />
                    </View>
                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                        <Text style={styles.text}>Currency:</Text>
                        <View style={{ ...styles.dropDownContainer}}>
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
                        <Text style={[styles.text, { color: inputNarrationTextColor }]}>Narration:</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: inputNarrationBgColor }]}
                            editable={inputNarrationState}
                            value={inputNarrationValue}
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
};

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
});

export default AddExpenseForm;