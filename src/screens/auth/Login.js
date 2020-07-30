import React, { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ToastAndroid,
    ScrollView
} from 'react-native';

import { Toast } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, TextInput, Snackbar } from 'react-native-paper';

import { Config } from '../../utils/Config';
import { colors, sizes, sizeRatio } from '../../utils/theme';
import { LoginStyle } from './Loginstyle';
import Params from '../../utils/Params';
import E from '../../utils/Expenzing';
import _ from '../../utils/Var';

//import SQLite from "react-native-sqlite-2";
//import SqlQueries from "../../database/SqlQueries";
import ApiKeys from '../../utils/ApiKeys';

import { Cache } from "react-native-cache";
import CacheKeys from "../../database/CacheKeys";
//import RNRestart from 'react-native-restart';

import axios from 'axios';

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

import Loader from "../../utils/Loader";

const AppIcon200 = require('../../assets/image/AppIcon200.png');

//const db = SQLite.openDatabase({ name: "expenzing.db" });

import Modal from "react-native-simple-modal";

//------------- Login credentials [Start]---------------------//
const live_email = 'ks@nexstep.com'; //kp@nexstep.com //jw@nexstep.com
const live_password = 'capital';

const local_email = 'ks@nexstep.com';
const local_password = '123';
//------------- Login credentials [End]----------------------//

const Login = props => {

    const [email, setEmail] = useState(''); //submitter1@domain.com#agileindia - live
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const [baseUrl, setBaseUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [validPassword, setValidPassword] = useState(true);
    const [validMobile, setValidMobile] = useState(true);
    const [validEmail, setValidEmail] = useState(true);

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [showSnack, setShowSnack] = useState(false);

    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [alertDialogTitle, setAlertDialogTitle] = useState('');
    const [alertDialogBody, setAlertDialogBody] = useState('');

    const toastMessage = (message) => {
        Toast.show({
            text: message,
            position: 'bottom',
            textStyle: { textAlign: 'center' },
            duration: 2000,
            style: { margin: 26, borderRadius: 12, bottom: '60%' }
        });
    }

    const setUserStatusInLocalStorage = (status) => {
        cache.setItem(CacheKeys.USER_STATUS, status, function (err) { });
    }

    const setUrlPathLocalStorage = (url) => {
        cache.setItem(CacheKeys.BASE_URL_PATH, url, function (err) { });
    }

    const submitPressHandler = () => {

        console.log('--- LOGIN BUTTON PRESS -----');
        props.navigation.navigate('App');
        // if (!isLoading) {
        //     if (!validForm()) {
        //         setShowSnack(true);
        //         return;
        //     }

        //     if (email.includes('@')) {
        //         const commonLoginParams = Params.bind(
        //             Params.commonLogin,
        //             email.split('@')[1],
        //             'Android',
        //             'NEXGEN_EXPENZING_TNE_APP',
        //         );

        //         setIsLoading(true);


        //         E._post(Config.commonLoginUrl, commonLoginParams).then(res => {
        //             //console.log('Common Login Data : ' + JSON.stringify(res.data))
        //             console.log('Common Login Api response [Status] : ' + res.status);
        //             if (res.status == 200 && res.data !== null) {
        //                 if (res.data.status === ApiKeys.SUCCESS) {
        //                     console.log('Common Login Data : ' + JSON.stringify(res.data))
        //                     console.log('Common Login Api response : ' + res.data.message)
        //                     //Base Url stored in cache
        //                     setUrlPathLocalStorage(res.data.message);
        //                     callLoginApi(res.data.message);
        //                 } else if (res.data.status === ApiKeys.FAILURE) {
        //                     setIsLoading(false);
        //                     //toastMessage(res.data.message);
        //                     setAlertDialog('Error', res.data.message);
        //                     console.log('Common Login Api response : ' + res.data.message)
        //                 }
        //             }
        //         }).catch((error) => {
        //             console.log("Common Login Api call error : " + error);
        //             setIsLoading(false);
        //             setAlertDialog('Error', error);
        //         });
        //     } else {
        //         setIsLoading(false);
        //         setShowSnack(true);
        //         setValidateMessage('Something went wrong, please try again');
        //         setIsLoading(false);
        //     }
        // }
    }


    const saveUserData = (val, appDetails, baseUrl) => {
        console.log('-- invoiceWithPORole --> ' + val.invoiceWithPORole);
        console.log('-- invoiceWithoutPORole --> ' + val.invoiceWithoutPORole);
        cache.setItem(CacheKeys.EMP_ID, val.empId, function (err) { });
        cache.setItem(CacheKeys.BUDGETING_STATUS, val.budgetingStatus, function (err) { });
        cache.setItem(CacheKeys.LOCATION_NAME, val.locationName, function (err) { });
        cache.setItem(CacheKeys.MESSAGE, val.Message, function (err) { });
        cache.setItem(CacheKeys.DESIGNATION_ID, val.designationId, function (err) { });
        cache.setItem(CacheKeys.ORG_UNIT, val.orgUnit, function (err) { });
        cache.setItem(CacheKeys.PC_NAME, val.pcName, function (err) { });
        cache.setItem(CacheKeys.CC_NAME, val.ccName, function (err) { });
        cache.setItem(CacheKeys.TYPE, val.type, function (err) { });
        cache.setItem(CacheKeys.FOR_UNIT_ID, val.forUnitId, function (err) { });
        cache.setItem(CacheKeys.COMPANY_ID, val.companyId, function (err) { });
        cache.setItem(CacheKeys.PR_ROLE, val.prRole, function (err) { });
        cache.setItem(CacheKeys.CC_ID, val.ccId, function (err) { });
        cache.setItem(CacheKeys.ZONE, val.zone, function (err) { });
        cache.setItem(CacheKeys.LOCATION_ID, val.locationId, function (err) { });
        cache.setItem(CacheKeys.EMP_NAME, val.empName, function (err) { });
        cache.setItem(CacheKeys.UNIT_ID, val.unitId, function (err) { });
        cache.setItem(CacheKeys.ZONE_ID, val.zoneId, function (err) { });
        cache.setItem(CacheKeys.PC_ID, val.pcId, function (err) { });
        cache.setItem(CacheKeys.COMPANY, val.company, function (err) { });
        cache.setItem(CacheKeys.DET_FUND_ID, val.detFundId, function (err) { });
        cache.setItem(CacheKeys.DET_FUND, val.detFund, function (err) { });
        cache.setItem(CacheKeys.DET_PROJECT_ID, val.detProjectId, function (err) { });
        cache.setItem(CacheKeys.DET_PROJECT, val.detProject, function (err) { });
        cache.setItem(CacheKeys.INVOICE_WITH_PO, val.invoiceWithPORole, function (err) { });
        cache.setItem(CacheKeys.INVOICE_WITHOUT_PO, val.invoiceWithoutPORole, function (err) { });
        cache.setItem(CacheKeys.MODULE_TYPE, val.moduleType, function (err) { });
        cache.setItem(CacheKeys.PR_CREATE_ROLE, val.prCreateRole, function (err) { });
        cache.setItem(CacheKeys.USER_LOGIN_SUCCESS, true, function (err) { });
        cache.setItem(CacheKeys.SHOW_INV_WITH_PO_LIST, val.showInvWithPOList, function (err) { });
        cache.setItem(CacheKeys.SHOW_INV_WITHOUT_PO_LIST, val.showInvWithoutPOList, function (err) { });
        cache.setItem(CacheKeys.APP_VERSION, appDetails.appVersion, function (err) { });
        cache.setItem(CacheKeys.P2P_VERSION, appDetails.p2pVersion, function (err) { });
        cache.setItem(CacheKeys.ASSET_VERSION, appDetails.assetVersion, function (err) { });
        cache.setItem(CacheKeys.CONTACT, appDetails.contact, function (err) { }); 
        cache.setItem(CacheKeys.USER_NAME, email.split('#')[0], function (err) { });
        cache.setItem(CacheKeys.DESIGNATION, val.designation, function (err) {
            console.log('Pheww !! Data cached successfully...');
            console.log('Login Success  --> Module Type : ' + val.moduleType);
            setIsLoading(false);
            props.navigation.navigate('App');

        });

    }

    const callLoginApi = baseUrl => {
        const loginParams = Params.bind(
            Params.login,
            email,
            password,
        );

        console.log('===>>> ' + Config.loginUrl(baseUrl));
        console.log('===>>> Params : ' + JSON.stringify(loginParams));

        E.post(Config.loginUrl(baseUrl), loginParams).then(res => {
            console.log('----- LOGIN API DATA --- : ' + JSON.stringify(res.data));
            if (res.status === 200 && res.data !== null) {
                if (res.data.status === ApiKeys.SUCCESS) {
                    console.log('LOGIN SUCCESS !')
                    //console.log('---- LOGIN DATA : ' + JSON.stringify(res.data));
                    //Login Data is stored in cache
                    saveUserData(res.data, res.data.appDetails, baseUrl);
                    //User status stored in cache
                    setUserStatusInLocalStorage("Valid");


                } else if (res.data.status === ApiKeys.FAILURE) {

                    let successMessage = res.data.Message;
                    if (successMessage.length === 0) {
                        console.log('--> Wrong UserName or Password');
                        setShowSnack(true);
                        setValidateMessage('Wrong UserName or Password');
                        setIsLoading(false);
                    } else {
                        console.log('--> Api response : ' + successMessage);
                        setShowSnack(true);
                        setValidateMessage('Something went wrong, please try again');
                        setIsLoading(false);
                    }


                } else {
                    setShowSnack(true);
                    setValidateMessage('Something went wrong, please try again');
                    setIsLoading(false);
                }
            } else {
                setShowSnack(true);
                setValidateMessage('Something went wrong, please try again');
                setIsLoading(false);
            }
        }).catch((error) => {
            console.log("Login Api call error : " + error);
            setShowSnack(true);
            setValidateMessage('Something went wrong, please try again. Error : ' + error);
            setIsLoading(false);
        });
    }

    const validEmailHandler = Email => {

        if (Email.length >= 3) {
            return true;
        } else {
            setEmail('');
            setValidEmail(false);
            setValidateMessage('Please enter correct email address');
            return false;
        }
    }

    const validPasswordHandler = Password => {

        if (Password.length >= 3) {
            console.log('Valid pass');
            return true;
        } else {
            setPassword('');
            console.log('Invalid pass');
            setValidPassword(false);
            setValidateMessage('Please enter correct password');
            return false;
        }
    }

    const validForm = () => {

        if (!validEmailHandler(email)) {
            return false;
        }
        if (!validPasswordHandler(password)) {
            return false;
        }
        return true;
    }

    const clearValidateResults = () => {
        setShowSnack(false);
        setValidateMessage('');
        setValidEmail(true);
        setValidPassword(true);
        setValidMobile(true);
    }

    const validateMessageHandller = message => {
        setShowSnack(false);
        setValidateMessage(message);
    }

    const setEmailHandler = email => {
        if (email.length === 0) {
            setEmail('');
        } else {
            setEmail(email);
        }

    }

    const setPasswordHandler = password => {
        if (password.length === 0) {
            setPassword('');
        } else {
            setPassword(password);
        }

    }

    const setShowPassHandler = () => {
        setIsShowPassword(!isShowPassword);
    }

    let validationSnack = <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
        <Snackbar
            visible={showSnack}
            //visible={true}
            onDismiss={validateMessageHandller}
            action={{
                label: 'Ok',
                onPress: () => { },
            }}
            style={LoginStyle.snack}>
            <Text style={{ fontFamily: 'Nunito-Regular', color: '#8a6d3b' }}>{validateMessage}</Text>
            {/* <Text style={{ color: '#8a6d3b' }}>Validation Message</Text> */}
        </Snackbar>
    </View>;

    const setAlertDialog = (title, body) => {
        setShowAlertDialog(true);
        setAlertDialogTitle(title);
        setAlertDialogBody(body);
    }

    return (
        <KeyboardAvoidingView style={LoginStyle.container} enabled>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Loader
                    loading={isLoading}
                    loadingText='Please wait...' />

                <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={LoginStyle.textContainer}>
                        <View style={LoginStyle.appIconWrap}>
                            <Image source={AppIcon200} style={LoginStyle.appIcon} />
                            <Text style={LoginStyle.expenzing}>
                                Expenz<Text style={{ fontFamily: 'Nunito-Regular', color: colors.sec }}>i</Text>ng
                            </Text>
                        </View>
                        <Text style={LoginStyle.sublogo}>
                            Sourcing, Procurement, Accounts Payable.
                        </Text>
                    </View>
                    {showSnack ? validationSnack : null}
                </View>

                <View style={LoginStyle.formContainer}>
                    <TextInput
                        label="Email or Username"
                        value={email}
                        mode={'outlined'}
                        theme={inputTheme}
                        autoCapitalize="none"
                        underlineColor={colors.pri}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        style={{ ...LoginStyle.input, ...(validEmail ? {} : LoginStyle.inValid) }}
                        onFocus={clearValidateResults}
                        onChangeText={setEmailHandler}
                    />
                    <View style={{ marginTop: 14 }}>
                        <TextInput
                            label="Password"
                            theme={inputTheme}
                            mode={'outlined'}
                            underlineColor="transparent"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={{ ...LoginStyle.input, ...(validPassword ? {} : LoginStyle.inValid) }}
                            onFocus={() => clearValidateResults}
                            onChangeText={setPasswordHandler}
                            value={password}
                            secureTextEntry={!isShowPassword}
                        />
                        <TouchableOpacity
                            style={LoginStyle.eye}
                            onPress={setShowPassHandler}>
                            <Icon
                                name={!isShowPassword ? 'eye-slash' : 'eye'}
                                size={sizes.fontLg + 5}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={LoginStyle.btnContainer}>
                    {/* <Button
                        // loading={isLoading}
                        onPress={submitPressHandler}
                        mode="contained"
                        color={colors.pri}
                        style={LoginStyle.btn}>
                        Login
                    </Button> */}
                    <TouchableOpacity
                        // loading={isLoading}
                        onPress={submitPressHandler}
                        style={LoginStyle.loginButtonContainer}>
                        <Text style={LoginStyle.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <Modal
                open={showAlertDialog}
                closeOnTouchOutside={true}
                modalDidClose={() => setShowAlertDialog(false)}
                style={{ alignItems: "center" }}
                modalStyle={{
                    borderRadius: 10,
                    backgroundColor: colors.white
                }}>
                <View>
                    <View style={{ padding: 10 }}>
                        <Text style={LoginStyle.alertDialogTitle}>{alertDialogTitle}</Text>
                    </View>
                    <View style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                        <Text style={LoginStyle.alertDialogBody}>{alertDialogBody}</Text>
                    </View>
                    <View style={LoginStyle.alertButtonsContainer}>
                        <View>
                            <TouchableOpacity
                                style={[LoginStyle.okayBtn]}
                                onPress={() => setShowAlertDialog(false)}>
                                <Text style={{
                                    color: colors.pri,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: sizes.font_14,
                                    fontWeight: 'bold'
                                }}>
                                    OKAY
                                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const inputTheme = {
    colors: {
        primary: colors.pri,
    },
};

export default Login;