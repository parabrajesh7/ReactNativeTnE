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
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import { Container, Header, Icon, Button, Body, Content, Left, Right, Title, Fab, Toast, Root } from 'native-base';
import { colors, sizes, sizeRatio } from '../../utils/theme';

import Loader from "../../utils/Loader";

import { IconStyle } from '../../utils/IconStyle';
const DoneIcon = require('../../assets/image/done.png');
const ApprovalIcon = require('../../assets/image/approval.png');
const CalendarIcon = require('../../assets/image/calendar.png');

import NavigationService from '../../navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';

import Modal from "react-native-simple-modal";

import { ButtonGroup } from 'react-native-elements'
import { Picker } from 'native-base';
import { RadioButton } from 'react-native-paper';

const TravelIcon = require('../../assets/image/travelreq.png');
const TravelSettlement01 = require('../../assets/image/travel_settle_01.png');
const TravelSettlement02 = require('../../assets/image/travel_settle_02.png');

let buttons = ['ONE WAY', 'RETURN'];
let fromData = [
    { value: 'Mumbai', id: 1 },
    { value: 'Pune', id: 2 },
    { value: 'Nashik', id: 3 }
];
let toData = [
    { value: 'Ahemdabad', id: 1 },
    { value: 'Pune', id: 2 },
    { value: 'Nashik', id: 3 }
];
let returnView;

class TravelRequest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
            isSubmitForm: false,
            loading: false,
            selectedIndex: 0,
            open: false,
            fromLocation: '',
            toLocation: '',
            showReturnView: false,
            advanceOption: '',
            travelDeskOption: ''
        };

        this.updateIndex = this.updateIndex.bind(this);
        this.closeTravelRequestHandler = this.closeTravelRequestHandler.bind(this);
        this.approvalHandler = this.approvalHandler.bind(this);
        this.doneButtonHandler = this.doneButtonHandler.bind(this);
        this.discardChangesHandler = this.discardChangesHandler.bind(this);
        this.setFromLocation = this.setFromLocation.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        returnView = <View style={{ ...styles.rowStyle, marginTop: 10 }}>
            <Text style={styles.text}>Return:</Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ ...styles.dateText, color: colors.black }}>01/13/2020</Text>
                        <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <View style={{ ...styles.input, marginStart: 18, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ ...styles.dateText, color: colors.black }}>17:00 PM</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>;

    }



    updateIndex = (index) => {
        this.setState({ selectedIndex: index });
        const { showReturnView } = this.state;
        console.log('Show return view : ' + showReturnView);
        switch (index) {
            case 0:
                console.log('Selected Option : ' + index);
                this.setState({ showReturnView: false });
                break;
            case 1:
                console.log('Selected Option : ' + index);
                this.setState({ showReturnView: true });
                break;
        }
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
        this.closeTravelRequestHandler();
        //}
        return true;
    }

    toastMessage = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    discardChangesHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');

    }

    closeTravelRequestHandler = () => {
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

    approvalHandler = () => {
        const { context } = this.state;

        context.closeModal();
        context.showLoading();

        setTimeout(() => {
            context.hideLoading();
            context.toastMessage('Sent for Approval successfully');
            context.discardChangesHandler();
        }, 2000);
    }

    setFromLocation = (value) => {
        const { fromLocation } = this.state;
        this.setState({ fromLocation: value });
    }

    setToLocation = (value) => {
        const { toLocation } = this.state;
        this.setState({ toLocation: value });
    }

    render() {
        const { navigation } = this.props;
        const { context, selectedIndex, fromLocation, toLocation,
            showReturnView, advanceOption, travelDeskOption } = this.state;

        return (
            <Root>
                <Container>
                    <Loader
                        loading={this.state.loading}
                        loadingText='Please wait...' />
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.closeTravelRequestHandler()}>
                                    <Icon name='close' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Travel Request</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.doneButtonHandler()}>
                                    <Image source={DoneIcon} style={IconStyle.smallIcon} />
                                </Button>
                            </Right>
                        </Header>
                        <View style={styles.buttonGroupContainer}>
                            <ButtonGroup
                                onPress={(value) => context.updateIndex(value)}
                                selectedIndex={selectedIndex}
                                buttons={buttons}
                                textStyle={{fontSize: sizes.font_12}}
                                containerStyle={styles.buttonGroup}
                                selectedButtonStyle={styles.selectedButtonStyle}
                            />
                        </View>
                        <Content>
                            <View style={styles.screen}>
                                <View style={styles.formContainer}>
                                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                                        <Text style={styles.text}>From:</Text>
                                        <View style={{ ...styles.dropDownContainer }}>
                                            <Picker
                                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.90 }], height: 40, marginBottom: 14 }}
                                                iosHeader="From"
                                                Header="From"
                                                mode="dropdown"
                                                placeholder='Select Location'
                                                headerBackButtonText='Back'
                                                selectedValue={fromLocation}
                                                onValueChange={(value) => { context.setFromLocation(value) }}>

                                                {fromData.map((name, i) => {
                                                    return (
                                                        <Picker.Item label={name.value} value={name.id} key={i} />
                                                    );
                                                }
                                                )}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 0 }}>
                                        <Text style={styles.text}>To:</Text>
                                        <View style={{ ...styles.dropDownContainer }}>
                                            <Picker
                                                style={{ color: colors.black, transform: [{ scaleX: 0.95 }, { scaleY: 0.90 }], height: 40, marginBottom: 14 }}
                                                iosHeader="To"
                                                Header="To"
                                                mode="dropdown"
                                                placeholder='Select Location'
                                                headerBackButtonText='Back'
                                                selectedValue={toLocation}
                                                onValueChange={(value) => { context.setToLocation(value) }}>

                                                {toData.map((name, i) => {
                                                    return (
                                                        <Picker.Item label={name.value} value={name.id} key={i} />
                                                    );
                                                }
                                                )}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 8 }}>
                                        <Text style={styles.text}>Departure:</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => { }}>
                                                <View style={{ ...styles.input, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                    <Text style={{ ...styles.dateText, color: colors.black }}>24/12/2019</Text>
                                                    <Image source={CalendarIcon} style={{ ...IconStyle.mediumIcon, marginStart: 14 }} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { }}>
                                                <View style={{ ...styles.input, marginStart: 18, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                    <Text style={{ ...styles.dateText, color: colors.black }}>06:00 AM</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {showReturnView ? returnView : null}
                                    <View style={{ ...styles.rowStyle, marginTop: 8 }}>
                                        <Text style={[styles.text]}>Travel Title:</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Trip to Finance client side'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                                        <Text style={[styles.text]}>Mode:</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Air Domestic'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                                        <Text style={[styles.text]}>Category:</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Economy Class'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                                        <Text style={[styles.text]}>Purpose:</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Client Side'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 5 }}>
                                        <Text style={[styles.text]}>Expense Type:</Text>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Local Conyvance'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 10 }}>
                                        <Text style={[styles.text]}>Advance:</Text>
                                        <RadioButton.Group
                                            onValueChange={value => this.setState({ advanceOption: value })}
                                            value={advanceOption}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <RadioButton status='checked' color={colors.colorPaid} value="Yes" />
                                                <Text>Yes</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <RadioButton color={colors.colorPaid} value="No" />
                                                <Text>No</Text>
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 10 }}>
                                        <Text style={[styles.text]}>Travel Desk:</Text>
                                        <RadioButton.Group
                                            onValueChange={value => this.setState({ travelDeskOption: value })}
                                            value={travelDeskOption}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <RadioButton status='checked' color={colors.colorPaid} value="Yes" />
                                                <Text>Yes</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <RadioButton color={colors.colorPaid} value="No" />
                                                <Text>No</Text>
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 10 }}>
                                        <View style={{ width: 115, maxWidth: '100%' }}>
                                            <View style={{ ...styles.optionStyle, backgroundColor: '#AACBD5' }}>
                                                <Image source={TravelIcon} style={styles.listIcon} />
                                            </View>
                                        </View>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={'Early morning flight meeting at 9'}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 12 }}>
                                        <View style={{ width: 115, maxWidth: '100%' }}>
                                            <View style={{ ...styles.optionStyle, backgroundColor: '#AACBD5' }}>
                                                <Image source={TravelSettlement01} style={styles.listIcon} />
                                            </View>
                                        </View>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={''}
                                            returnKeyType={'next'} />
                                    </View>
                                    <View style={{ ...styles.rowStyle, marginTop: 12 }}>
                                        <View style={{ width: 115, maxWidth: '100%' }}>
                                            <View style={{ ...styles.optionStyle, backgroundColor: '#AACBD5' }}>
                                                <Image source={TravelSettlement02} style={styles.listIcon} />
                                            </View>
                                        </View>
                                        <TextInput
                                            style={[styles.input]}
                                            editable={true}
                                            value={''}
                                            returnKeyType={'next'} />
                                    </View>
                                </View>
                            </View>
                        </Content>
                    </View>
                </Container>
                <Modal
                    open={this.state.open}
                    modalDidOpen={this.modalDidOpen}
                    modalDidClose={this.modalDidClose}
                    style={{ alignItems: "center" }}
                    modalStyle={{
                        borderRadius: 10,
                        backgroundColor: "#F5F5F5"
                    }}>
                    <View>
                        <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                            <Text style={styles.modalTitle}>Send for Approval ?</Text>
                        </View>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ ...styles.touchable, backgroundColor: colors.colorPaid }}
                                onPress={() => context.approvalHandler()}>
                                <View style={{ ...styles.modalOption }}>
                                    <Image source={ApprovalIcon} style={IconStyle.largeIcon} />
                                    <Text style={styles.optionLabel}>Tap to send</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    buttonGroupContainer: {
        flexDirection: 'column',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 0,
        paddingTop: 10,
        alignItems: 'center'
    },
    buttonGroup: {
        height: 35,
        borderRadius: 10,
        borderColor: colors.border,
    },
    selectedButtonStyle: {
        backgroundColor: colors.pri,
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    dateText: {
        fontSize: sizes.font_14,
        paddingTop: 10,
        paddingBottom: 10
    },
    listIcon: {
        height: sizes.fontLg + 4,
        width: sizes.fontLg + 4,
    },
    optionStyle: {
        width: 50,
        height: 50,
        borderRadius: 200,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    modalTitle: {
        fontSize: sizes.font_16,
        fontWeight: 'bold',
        color: '#263238'
    },
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    touchable: {
        width: '60%',
        height: 110,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Only for Android
    },
    modalOption: {
        width: '70%',
        height: 110,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        marginTop: 16,
        fontSize: sizes.font_14,
    },

});

export default TravelRequest;