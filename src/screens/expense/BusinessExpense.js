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
    TouchableOpacity
} from 'react-native';

import HeaderForm from './HeaderForm';

import { Container, Header, Icon, Button, Body, Content, Left, Right, Title, Fab, Toast, Root } from 'native-base';
import { colors, sizes, sizeRatio } from '../../utils/theme';

import Loader from "../../utils/Loader";

import { IconStyle } from '../../utils/IconStyle';
const DoneIcon = require('../../assets/image/done.png');
const ApprovalIcon = require('../../assets/image/approval.png');

import NavigationService from '../../navigation/NavigationService';
import { NavigationEvents } from 'react-navigation';

import Modal from "react-native-simple-modal";

import { Cache } from "react-native-cache";
import CacheKeys from "../../database/CacheKeys";

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});


let expenseAdded = '';


class BusinessExpense extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isSubmitForm: false,
            context: this,
            open: false,
            loading: false,
            isExpenseAddedValue: false
        };

        this.expenseTypeId = '-1';
        /**
         * Value is recieved from saveSuccessCallback() <-- AddExpense
         * Pass this value to the HeaderForm to refresh the List
        */
        //expenseAdded = JSON.stringify(this.props.navigation.getParam('expenseAdded', ''));

        //console.log('---> BUSINESS EXPENSE [Expense Added] : ' + expenseAdded);


        this.discardChangesHandler = this.discardChangesHandler.bind(this);
        this.handleCallBack = this.handleCallBack.bind(this);
        this.addExpenseButtonHandler = this.addExpenseButtonHandler.bind(this);
        this.closeBusinessExpenseHandler = this.closeBusinessExpenseHandler.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.assignBackEventListener = this.assignBackEventListener.bind(this);
        this.doneButtonHandler = this.doneButtonHandler.bind(this);
        this.validationSuccesCallback = this.validationSuccesCallback.bind(this);
        this.resetCallback = this.resetCallback.bind(this);
        this.toastMessage = this.toastMessage.bind(this);
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
        if (this.state.open) {
            this.closeModal();
        } else {
            this.closeBusinessExpenseHandler();
        }
        return true;
    }

    toastMessage = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    //console.log('---> BUSINESS EXPENSE [Expense Added] : ' + expenseAdded);

    //cache.setItem(CacheKeys.REFRESH_EXPENSE_LIST, 'initial', function (err) { });

    /**
     * The --> handleCallBack() recieves the data from the 
     * child component i.e. --> HeaderForm
     */
    handleCallBack = (value) => {
        console.log('---------------------------------------------------------');
        console.log('>>> CALLBACK VALUE RECIEVED FROM HEADER FORM --> ' + value);
        console.log('---------------------------------------------------------');
        this.expenseTypeId = value;
    };

    addExpenseButtonHandler = () => {
        console.log('---------------------------------------------------------');
        console.log('>>> FAB BUTTON CLICKED --> ' + this.expenseTypeId);
        console.log('---------------------------------------------------------');

        if (this.expenseTypeId === '-1' || this.expenseTypeId === 'undefined') {
            this.toastMessage('Select Expense Type');
        } else {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
            NavigationService.navigate('AddExpense', { id: this.expenseTypeId, clearImage: true });
        }
    }



    discardChangesHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');

    }

    closeBusinessExpenseHandler = () => {
        const { navigate } = this.props.navigation;
        const { context } = this.state;

        navigate('HomeScreen');
    }

    assignBackEventListener = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    resetCallback = () => {
        console.log('---------- RESET CALLBACK ----------')
        this.setState({ isSubmitForm: false });
    }

    doneButtonHandler = () => {
        const { isSubmitForm } = this.state;
        //this.toastMessage('Done : ' + isSubmitForm);
        this.setState({ isSubmitForm: true });
    }

    validationSuccesCallback = () => {
        console.log('----- VALIDATION SUCCESS -------');
        const { context } = this.state;
        //cache.getItem(CacheKeys.IS_EXPENSE_ADDED, function (err, value) { 
            if(true){
                context.openModal();
            }else {
                context.toastMessage('Add expenses');
            }
        // });
        
    }

    approvalHandler = () => {
        const { context } = this.state;

        context.closeModal();
        context.showLoading();

        setTimeout(() => {
            context.hideLoading();
            context.toastMessage('Sent for Approval successfully');
            context.discardChangesHandler();
        },2000);
    }

    saveBusinessExpDetails = () => {
        const { context } = this.state;

        setTimeout(() => {
            context.hideLoading();
            context.toastMessage('Record(s) has been synchronized successfully.');
            context.discardChangesHandler();
        },2000);

    }

    syncHandler = () => {
        const { context } = this.state;

        context.closeModal();
        context.showLoading();
        context.saveBusinessExpDetails();

    }

    render() {
        const { navigation } = this.props;
        const { context, isSubmitForm } = this.state;

        return (
            <Root>
                <NavigationEvents
                    onDidFocus={() => this.assignBackEventListener()}
                />
                <Container>
                    <Loader
                        loading={this.state.loading}
                        loadingText='Please wait...' />
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.closeBusinessExpenseHandler()}>
                                    <Icon name='close' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Business Expense</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Button transparent onPress={() => this.doneButtonHandler()}>
                                    <Image source={DoneIcon} style={IconStyle.smallIcon} />
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <HeaderForm
                                callBack={(value) => this.handleCallBack(value)}
                                submit={isSubmitForm}
                                reset={() => this.resetCallback()}
                                validationSuccess={() => this.validationSuccesCallback()}
                                isExpenseAdded={0} />
                        </Content>
                        <Fab
                            active={true}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: colors.pri }}
                            position="bottomRight"
                            onPress={this.addExpenseButtonHandler}>
                            <Icon name="add" />
                        </Fab>
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
                            <Text style={styles.modalTitle}>Choose an option:</Text>
                        </View>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={{ ...styles.touchable, backgroundColor: colors.colorPaid }}
                                onPress={() => context.approvalHandler()}>
                                <View style={{ ...styles.modalOption }}>
                                    <Image source={ApprovalIcon} style={IconStyle.largeIcon} />
                                    <Text style={styles.optionLabel}>Approval</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.touchable, backgroundColor: '#AACBD5', marginStart: 16 }}
                                onPress={() => context.syncHandler()}>
                                <View style={{ ...styles.modalOption }}>
                                    <Image source={ApprovalIcon} style={IconStyle.largeIcon} />
                                    <Text style={styles.optionLabel}>Sync</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Root>
        );
    }

}

const styles = StyleSheet.create({

    modalTitle: {
        fontSize: sizes.font_16,
        fontWeight: 'bold',
        color: '#263238'
    },
    modalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    modalOption: {
        width: '100%',
        height: 110,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionLabel: {
        marginTop: 16,
        fontSize: sizes.font_16,
    },
    touchable: {
        width: '100%',
        height: 110,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Only for Android
    },

});


export default BusinessExpense;