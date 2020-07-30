import React, { Component, useState } from 'react';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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

import TRSubCardList from './travelreqsubcard/TRSubCardList';
import CustomDivider from '../../../utils/CustomDivider';

import moment from 'moment';

let startDate_01 = '2020-01-01';
let endDate_01 = '2020-01-02';

let startDate_02 = '2019-12-18';
let endDate_02 = '2019-12-21';

let startDate_03 = '2019-11-01';
let endDate_03 = '2019-11-05';

let startDateList = [startDate_01, startDate_02, startDate_03];
let endDateList = [endDate_01, endDate_02, endDate_03];

let colorsList = [colors.colorPaid, colors.pri, colors.colorUnpaid]

const TravelRequestCard = props => {

    const nextDay = [
        '2019-12-07',
        '2019-12-08',
        '2019-12-09',
        '2019-12-10',
        '2019-12-11',

        '2019-12-19',
        '2019-12-20',
        '2019-12-21',
    ];

    //let newDaysObject = {};

    // nextDay.forEach((day) => {
    //     newDaysObject[day] = {
    //         selected: true,
    //         marked: true
    //     };
    // });

    const [marked, setIsMarked] = useState(null);

    // let obj = nextDay.reduce((c, v) => Object.assign(c, {
    //     [v]: {
    //         selected: true, color: colors.colorPaid, textColor: colors.white
    //     }
    // }), {});


    // Object.size = function (obj) {
    //     var size = 0, key;
    //     for (key in obj) {
    //         if (obj.hasOwnProperty(key)) size++;
    //     }
    //     return size;
    // };


    const createDateRange = (startDateData, endDateData, noOfGroups) => {
        let dateRange;
        let sd;
        let ed;

        for (let index = 0; index < noOfGroups; index++) {

            sd = moment(startDateData[index]).format('YYYY-MM-DD');
            ed = moment(endDateData[index]).format('YYYY-MM-DD');

            dateRange = {
                ...dateRange,
                [sd]: { selected: true, startingDay: true, color: colorsList[index] },
                [ed]: { selected: true, endingDay: true, color: colorsList[index] },
            };

            if (sd && ed) {
                let start = moment(sd).startOf('day').add(1, 'days');
                let end = moment(ed).startOf('day');
                while (end.isAfter(start)) {
                    Object.assign(dateRange, { [start.format('YYYY-MM-DD')]: { selected: true, color: colorsList[index] } });
                    start = start.add(1, 'days');
                }
            }
            console.log('--------------- TEST -------------> ' + sd + " " + ed);
            //console.log('--------------- DATE RANGE -------------> ' + dateRange);
        }
        //setIsMarked(marked);
        return dateRange;

    }

    if (marked === null) {
        //createDateRange(startDateList, endDateList, 2);
    }

    const monthChangedHandler = (month) => {

        if (month) {
            console.log('month changed', month);
            
            //createDateRange(datesList, 2);
        }
    }

    const selectedDayHandler = (day) => {
        console.log('selected day ', day);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.cardConatiner}>
                <View>
                    <CardTitle title={'TRAVEL REQUEST'} showAction={false} />
                    <View style={{ paddingLeft: 5, paddingRight: 5 }}>
                        <View style={{ paddingStart: 10 }}>
                            <Text style={{ fontSize: sizes.font_14, fontWeight: 'bold', color: colors.pri }}>UPCOMING TRIPS</Text>
                        </View>
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <CustomDivider bg={colors.lightGray} topMargin={10} />
                        </View>
                        <Calendar
                            // Initially visible month. Default = Date()
                            current={new Date()}
                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                            //minDate={'2012-05-10'}
                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                            maxDate={new Date()}
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => selectedDayHandler(day)}
                            // Handler which gets executed on day long press. Default = undefined
                            onDayLongPress={(day) => { console.log('selected day', day) }}
                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                            monthFormat={'MMM d, yyyy'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => monthChangedHandler(month)}
                            // Hide month navigation arrows. Default = false
                            hideArrows={false}
                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                            //renderArrow={(direction) => (<Arrow />)}
                            // Do not show days of other months in month page. Default = false
                            hideExtraDays={true}
                            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={false}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                            firstDay={1}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            showWeekNumbers={false}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={substractMonth => substractMonth()}
                            // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                            onPressArrowRight={addMonth => addMonth()}

                            // markedDates={{
                            //     '2019-12-08': { selected: true, color: colors.light_blue, textColor: colors.pri },
                            //     '2019-12-07': { startingDay: true, color: colors.light_blue, textColor: colors.pri },
                            //     '2019-12-09': { selected: true, color: colors.light_blue, textColor: colors.pri },
                            //     '2019-12-10': { selected: true, color: colors.light_blue, textColor: colors.pri },
                            //     '2019-12-11': { selected: true, endingDay: true, color: colors.light_blue, textColor: colors.pri },

                            //     '2019-12-18': { startingDay: true, color: colors.colorPaid, textColor: colors.white },
                            //     '2019-12-19': { selected: true, color: colors.colorPaid, textColor: colors.white },
                            //     '2019-12-20': { selected: true, color: colors.colorPaid, textColor: colors.white },
                            //     '2019-12-21': { selected: true, endingDay: true, color: colors.colorPaid, textColor: colors.white }
                            // }}
                            markedDates={createDateRange(startDateList, endDateList, 3)}
                            
                            //markedDates = {marked}
                            markingType={'period'}

                        />
                        <TRSubCardList />
                    </View>
                </View>
            </Card>
        </View>
    );

}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    cardConatiner: {
        width: 400,
        maxWidth: '100%',
        paddingBottom: 10
    },

});

export default TravelRequestCard;