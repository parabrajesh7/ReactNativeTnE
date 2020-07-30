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
    ScrollView,
    AsyncStorage,
    TouchableWithoutFeedback,
    Alert,
    ToastAndroid
} from 'react-native';

import { colors, sizes, sizeRatio } from '../../utils/theme';

const CalendarIcon = require('../../assets/image/calendar.png');
import { IconStyle } from '../../utils/IconStyle';

import ExpenseDatePicker from './ExpenseDatePicker';
import NoExpenseView from '../../common/NoExpenseView';
import ExpenseList from './expenselist/ExpenseList';
import { NavigationEvents } from 'react-navigation';

import { Picker, Fab, Icon } from 'native-base';

let expenseAddedValue = false;
let formattedStartDate = '';
let formattedEndDate = '';

let isTitleSet = false;
let isStartDateSet = false;
let isEndDateSet = false;
let isExpenseTypeSet = false;
let isForUnitSet = false;

import { Cache } from "react-native-cache";
import CacheKeys from "../../database/CacheKeys";

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

const HeaderForm = props => {

    const { submit, reset, validationSuccess } = props;

    const convertDate = (str) => {
        let date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("/");
    }

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(convertDate(new Date()));
    const [endDate, setEndDate] = useState(convertDate(new Date()));
    const [selectedExpenseType, setSelectedExpenseType] = useState('');


    const [isShowDisplayList, setIsShowDisplayList] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [isStartDatePicker, setIsStartDatePicker] = useState(true);

    let expenseTypeData = [
        { label: 'Select Expense Type', value: '-1' },
        { label: '1 Feet on Street', value: '1' },
        { label: '1 Office Expenses', value: '2' },
        { label: 'Employee Expense', value: '3' },
        { label: 'Petty Cash Expenses', value: '4' },
        { label: 'Relocation Claims', value: '5' },
        { label: 'Staff Expense', value: '6' }
    ];

    let unitData = [
        { value: 'Admin', id: 1 },
        { value: 'Non-Admin', id: 2 },
        { value: 'Other', id: 3 }
    ];

    const inputTitleHandler = (value) => {
        setTitle(value);
    }

    const errorToast = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    const validateDetails = (headerTitle, headerExpenseType) => {

        if (headerTitle === '') {
            errorToast('Header title required');
            return false;
        }

        if (headerExpenseType === '-1') {
            errorToast('Select expense type');
            return false;
        }

        return true;
    }



    /**
     * This submit value is recieved from --> BusinessExpense done button click
     */
    if (submit === true) {
        //console.log('--> VALIDATION --- ' + validateDetails(title, selectedExpenseType))
        reset();
        if (validateDetails(title, selectedExpenseType)) {
            //console.log('---> Data is valid');
            validationSuccess();
        } else {
            //console.log('---> Data is invalid');
        }
    }


    const modalVisibilityHandler = (isStartDatePicker) => {
        setIsModalVisible(!isModalVisible);
        Keyboard.dismiss();
        if (isStartDatePicker) {
            setIsStartDatePicker(true);
        } else {
            setIsStartDatePicker(false);
        }
    }

    const setStartDateHandler = (startDate) => {
        formattedStartDate = convertDate(startDate);
        setStartDate(formattedStartDate);
    }

    const setEndDateHandler = (endDate) => {
        formattedEndDate = convertDate(endDate);
        setEndDate(formattedEndDate);
    }

    let expenseDatePicker;

    if (isModalVisible) {
        if (isStartDatePicker) {
            expenseDatePicker = <ExpenseDatePicker
                pickerTitle={'Select Start Date'}
                pickerVisibility={isModalVisible}
                togglePicker={modalVisibilityHandler}
                dateHandler={setStartDateHandler}
                date={startDate} />;
        } else {
            expenseDatePicker = <ExpenseDatePicker
                pickerTitle={'Select End Date'}
                pickerVisibility={isModalVisible}
                togglePicker={modalVisibilityHandler}
                dateHandler={setEndDateHandler}
                date={endDate} />;
        }

    }

    //console.log('---> PROP  : ' + isShowDisplayList);

    /**
     * Value recieved as prop from BusinessExpense screen
     */

    // let value = props.isExpenseAdded;
    // console.log('----- EXPENSE ADDED [PROP-HEADER FORM] : ' + value);
    // if (value === 1) {
    //     console.log('------------ Business Expense Screen Opened [Expense Added State] --------------')
    //     setIsShowDisplayList(false);
    // }

    let noExpenseView;

    noExpenseView = <NoExpenseView />;

    //console.log('---> PROP VALUE [header form] : ' + isShowDisplayList);

    let displayList;
    displayList = <ExpenseList />;


    const discardChangesHandler = (value) => {
        /**
        * The --> callBack() prop below sends back the data 
        * to the parent component i.e. --> BusinessExpense
        */
        props.callBack(value);
        setSelectedExpenseType(value);
        setIsShowDisplayList(false);
    }

    const ETPickerValueChangeHandler = (value) => {

        /**
           * The --> callBack() method below sends back the data 
           * to the parent component i.e. --> BusinessExpense
           */
        props.callBack(value);
        setSelectedExpenseType(value);

    }

    const refreshListHandler = () => {
        console.log('------------------- REFRESH CALLED [Header Form] --------------------');
        //let value = props.isExpenseAdded;
        //console.log('----- [ON REFRESH] EXPENSE ADDED [PROP-HEADER FORM] : ' + value);
        //cache.getItem(CacheKeys.IS_EXPENSE_ADDED, function (err, value) {
            //console.log('----- [ON REFRESH] EXPENSE ADDED [PROP-HEADER FORM] : ' + value);
            if (!true) {
                console.log('------------ Business Expense Screen Opened [Expense Added State] --------------')
                setIsShowDisplayList(false);
            }else {
                setIsShowDisplayList(true);
            }
        //});
    }


    return (
        <View style={styles.screen}>
            <NavigationEvents
                onDidFocus={() => { refreshListHandler() }}
            />
            <View style={styles.formContainer}>
                <View style={styles.rowStyle}>
                    <Text style={styles.text}>Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={'Enter Title'}
                        value={title}
                        onChangeText={inputTitleHandler} />
                </View>
                <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                    <Text style={styles.text}>Start Date:</Text>
                    <TouchableOpacity onPress={() => modalVisibilityHandler(true)}>
                        <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ ...styles.dateText, color: colors.black }}>{startDate}</Text>
                            <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.rowStyle, marginTop: 10 }}>
                    <Text style={styles.text}>End Date:</Text>
                    <TouchableOpacity onPress={() => modalVisibilityHandler(false)}>
                        <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ ...styles.dateText, color: colors.black }}>{endDate}</Text>
                            <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                    <Text style={styles.text}>Expense Type:</Text>
                    <View style={{ ...styles.dropDownContainer }}>
                        <Picker
                            style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }], height: 40, marginBottom: 14 }}
                            iosHeader="Select Expense Type"
                            Header="Select Expense Type"
                            mode="dropdown"
                            placeholder='Select Expense Type'
                            headerBackButtonText='Back'
                            selectedValue={selectedExpenseType}
                            onValueChange={(value) => { ETPickerValueChangeHandler(value) }}>

                            {expenseTypeData.map((expense, i) => {
                                return (
                                    <Picker.Item label={expense.label} value={expense.value} key={i} />
                                );
                            }
                            )}
                        </Picker>

                    </View>
                </View>
                <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                    <Text style={styles.text}>For Unit:</Text>
                    <View style={{ ...styles.dropDownContainer }}>
                        <Picker
                            style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }], height: 40, marginBottom: 14 }}
                            iosHeader="Select Unit"
                            Header="Select Unit"
                            mode="dropdown"
                            placeholder='Select Unit'
                            headerBackButtonText='Back'
                            selectedValue={selectedUnit}
                            onValueChange={(value) => { setSelectedUnit(value) }}>

                            {unitData.map((unit, i) => {
                                return (
                                    <Picker.Item label={unit.value} value={unit.id} key={i} />
                                );
                            }
                            )}
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.divider} />
            <ScrollView>
                {/* {isShowDisplayList ? displayList : noExpenseView} */}
                {displayList}
            </ScrollView>
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
    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10
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
    divider: {
        marginTop: 20,
        height: 4,
        width: '100%',
        backgroundColor: '#ebebeb'
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
    noExpenseContainer: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    noExpense: {
        fontSize: sizes.fontLg + 3,
        color: colors.lightGray
    }
});

export default HeaderForm;
