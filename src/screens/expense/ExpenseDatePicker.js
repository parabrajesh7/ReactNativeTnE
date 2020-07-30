import React, { useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import DatePicker from 'react-native-date-picker';

import { colors, sizes } from '../../utils/theme';

const ExpenseDatePicker = props => {

    //const [isModalVisible, setIsModalVisible] = useState(props.pickerVisibility);


    if (props.pickerVisibility) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={props.togglePicker}>
                <View style={styles.container}>
                    <View style={{
                        marginTop: 'auto',
                        marginBottom: 'auto', justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <View style={styles.datePickerStyle}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{props.pickerTitle}</Text>
                            </View>
                            <DatePicker
                                maximumDate = {new Date()}
                                date={props.date}
                                mode='date'
                                fadeToColor={colors.white}
                                textColor={colors.pri}
                                onDateChange={date => { props.dateHandler(date) }} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={props.togglePicker}>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <View style={styles.doneButtonContainer}>
                                        <Text style={styles.doneButton}>Done</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            null
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050'
    },
    datePickerStyle: {
        backgroundColor: colors.white,
        borderRadius: 15,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 3, //Only for Android
    },
    titleContainer: {
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 14
    },
    title: {
        fontSize: sizes.font_20,
        fontWeight: 'bold',
        color: colors.pri
    },
    doneButtonContainer: {
        flex: 1,
        alignSelf: 'baseline',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 20,
        backgroundColor: colors.colorPaid,
        borderRadius: 5,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 3, //Only for Android
    },
    doneButton: {
        fontSize: sizes.font_14,
        color: colors.white
    }
});

export default ExpenseDatePicker;