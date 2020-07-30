import React, { useState, Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ToastAndroid,
    Alert,
    AsyncStorage,
    BackHandler,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

import {
    Container,
    Header,
    Icon,
    Button,
    Body,
    Content,
    Left,
    Right,
    Title,
    Fab,
    Toast,
    Picker,
    Root
} from 'native-base';
import { colors, sizes, sizeRatio } from '../../utils/theme';

import Loader from "../../utils/Loader";

import { IconStyle } from '../../utils/IconStyle';
const DoneIcon = require('../../assets/image/done.png');
const ApprovalIcon = require('../../assets/image/approval.png');
const CalendarIcon = require('../../assets/image/calendar.png');

import NavigationService from '../../navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';

import Modal from "react-native-simple-modal";

import { Cache } from "react-native-cache";
import CacheKeys from "../../database/CacheKeys";

import NoExpenseView from '../../common/NoExpenseView';
import ExpenseList from '../../screens/expense/expenselist/ExpenseList';

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

let tripRequestData = [
    { value: 'TR-11-12-2019-001', id: 1 },
    { value: 'TR-20-12-2019-011', id: 2 },
    { value: 'TR-31-12-2019-012', id: 3 }
];

let expenseTypeData = [
    { label: 'Select Expense Type', value: '-1' },
    { label: 'Company\'s Guest House', value: '1' },
    { label: 'Accommodation', value: '2' },
    { label: 'Accommodation-int', value: '3' },
];

let noExpenseView;
let displayList;

class TravelSettlement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
            isSubmitForm: false,
            loading: false,
            open: false,
            showReturnView: false,
            advanceOption: '',
            travelDeskOption: '',
            title: '',
            tripRequest: '',
            selectedExpenseType: '',
            isShowDisplayList: false
        };

        noExpenseView = <NoExpenseView />;
        displayList = <ExpenseList />;

        this.closeTravelSettleHandler = this.closeTravelSettleHandler.bind(this);
        //this.syncHandler = this.syncHandler.bind(this);
        this.doneButtonHandler = this.doneButtonHandler.bind(this);
        //this.discardChangesHandler = this.discardChangesHandler.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }

    showLoading = () => {
        this.setState({ loading: true })
    }

    hideLoading = () => {
        this.setState({ loading: false })
    }

    modalDidOpen = () => console.log("Modal did open.");

    modalDidClose = () => {
        this.setState({ open: false });
        console.log("Modal did close.");
    };

    openModal = () => this.setState({ open: true });

    closeModal = () => this.setState({ open: false });

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        // if (this.state.open) {
        //     this.closeModal();
        // } else {
        this.closeTravelSettleHandler();
        //}
        return true;
    }

    closeTravelSettleHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');
    }

    doneButtonHandler = () => {
        const { navigate } = this.props.navigation;
        const { isSubmitForm, context } = this.state;
        //this.toastMessage('Done : ' + isSubmitForm);
        this.setState({ isSubmitForm: true });
        context.openModal();
        //navigate('HomeScreen');
    }

    inputTitleHandler = (value) => {
        this.setState({ title: value });
    }

    setTripRequest = (value) => {
        this.setState({ tripRequest: value });
    }

    ETPickerValueChangeHandler = (value) => {

        this.setState({ selectedExpenseType: value })

    }

    render() {
        const { context, title, tripRequest, selectedExpenseType, isShowDisplayList } = this.state;

        return (
            <Root>
                <Container>
                    <Loader
                        loading={this.state.loading}
                        loadingText='Please wait...' />
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.closeTravelSettleHandler()}>
                                    <Icon name='close' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Travel Settlement</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.doneButtonHandler()}>
                                    <Image source={DoneIcon} style={IconStyle.smallIcon} />
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <View style={styles.screen}>
                                <View style={styles.formContainer}>
                                    <View style={styles.rowStyle}>
                                        <Text style={styles.text}>Title:</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={'Enter Title'}
                                            value={title}
                                            onChangeText={(value) => context.inputTitleHandler(value)} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                                        <Text style={styles.text}>Trip Request:</Text>
                                        <View style={{ ...styles.dropDownContainer }}>
                                            <Picker
                                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.90 }], height: 40, marginBottom: 14 }}
                                                iosHeader="Trip Request"
                                                Header="Trip Request"
                                                mode="dropdown"
                                                placeholder='Select Option'
                                                headerBackButtonText='Back'
                                                selectedValue={tripRequest}
                                                onValueChange={(value) => { context.setTripRequest(value) }}>

                                                {tripRequestData.map((name, i) => {
                                                    return (
                                                        <Picker.Item label={name.value} value={name.id} key={i} />
                                                    );
                                                }
                                                )}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                                        <Text style={styles.text}>Start Date:</Text>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Text style={{ ...styles.dateText, color: colors.black }}>12/26/2019</Text>
                                                <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 10 }}>
                                        <Text style={styles.text}>End Date:</Text>
                                        <TouchableOpacity onPress={() => { }}>
                                            <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <Text style={{ ...styles.dateText, color: colors.black }}>12/31/2019</Text>
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
                                                onValueChange={(value) => { context.ETPickerValueChangeHandler(value) }}>

                                                {expenseTypeData.map((expense, i) => {
                                                    return (
                                                        <Picker.Item label={expense.label} value={expense.value} key={i} />
                                                    );
                                                }
                                                )}
                                            </Picker>

                                        </View>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <ScrollView>
                                    {isShowDisplayList ? displayList : noExpenseView}
                                </ScrollView>
                            </View>
                        </Content>
                        <Fab
                            active={true}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: colors.pri }}
                            position="bottomRight"
                            onPress={() => { }}>
                            <Icon name="add" />
                        </Fab>
                    </View>
                </Container>
            </Root>
        )

    }
}

const styles = StyleSheet.create({

    screen: {
        justifyContent: 'center',
    },
    formContainer: {
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16
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
    dropDownContainer: {
        flex: 1,
        height: '70%',
        backgroundColor: colors.default_input_field,
        borderRadius: 5,
    },
    dateText: {
        fontSize: sizes.font_14,
        paddingTop: 10,
        paddingBottom: 10
    },
    divider: {
        marginTop: 8,
        height: 4,
        width: '100%',
        backgroundColor: '#ebebeb'
    },

});

export default TravelSettlement;