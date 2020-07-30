import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ToastAndroid,
    BackHandler,
    AsyncStorage
} from 'react-native';
import { Container, Header, Icon, Button, Body, Content, Left, Right, Title, Fab, Root } from 'native-base';
import { colors, sizes, sizeRatio } from '../../utils/theme';

import { IconStyle } from '../../utils/IconStyle';
const DoneIcon = require('../../assets/image/done.png');
const Camera = require('../../assets/image/camera.png');
const Folder = require('../../assets/image/folder.png');
const Card = require('../../assets/image/card.png');
const AttachmentIcon = require('../../assets/image/attachment.png');

import AddExpenseForm from './AddExpenseForm';

import NavigationService from '../../navigation/NavigationService';
import Loader from '../../utils/Loader';

import ImagePicker from 'react-native-image-crop-picker';

import Modal from "react-native-simple-modal";

let imagePath = '';
let base64Image = '';
let expenseTypeId = '';
let clearImagePath;
let attachmentRender = false;
let dataUri = '-1';
let renderCycleCount = 0;
let attachmentView;

import { Cache } from "react-native-cache";
import CacheKeys from "../../database/CacheKeys";

const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});


const AddExpense = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitForm, setIsSubmitForm] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);

    const modalDidOpen = () => console.log("Modal did open.");

    const modalDidClose = () => {
        setPreviewOpen(false);
        console.log("Modal did close.");
    };

    const openModal = () => setPreviewOpen(true);;

    const closeModal = () => setPreviewOpen(false);

    const openCameraHandler = () => {
        console.log(' ---------------------------------------------');
        console.log('|            CAMERA SELECTION                |');
        console.log(' ---------------------------------------------');
        NavigationService.navigate('ScanReceipt');
        //NavigationService.navigate('CameraScreen');
    }

    const openGallery = () => {
        console.log(' ---------------------------------------------');
        console.log('|            GALLERY SELECTION                |');
        console.log(' ---------------------------------------------');
        NavigationService.navigate('ScanReceipt');
    }
    const previewImage = () => {
        setPreviewOpen(true);
    }

    const doneButtonHandler = () => {
        //cache.setItem(CacheKeys.IS_EXPENSE_ADDED, true, function (err) { 
            setIsSubmitForm(true);
         //});
    }

    const resetCallback = (value) => {
        console.log('--------- CALL BACK FROM ADD BE FORM ----------');
        setIsSubmitForm(value);
    }

    /**
     * Navigates back to Business Expense screen 
     * Send back a param --> expenseAdded = '1'
     * ----- Recieved on Business Expense screen ----- 
     */
    const saveSuccessCallback = () => {


        NavigationService.navigate('BusinessExpense', { expenseAdded: 0 });
        ToastAndroid.showWithGravity(
            'Expense added successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );

    }

    const closeHandler = () => {
        props.navigation.goBack(null);
    }

    return (
        <Root>
            <Container>
                <View style={{ flex: 1 }}>
                    <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                        <Left style={{ flex: 1 }}>
                            <Button transparent onPress={() => closeHandler()}>
                                <Icon name='close' />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Title>Add Bussiness Expense</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Button transparent onPress={() => { doneButtonHandler() }}>
                                <Image source={DoneIcon} style={IconStyle.smallIcon} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Loader
                            loading={isLoading} />
                        <View style={styles.screen}>
                            <View style={styles.optionsContainer}>
                                <TouchableOpacity style={{ ...styles.touchable, backgroundColor: colors.colorPaid }} onPress={openCameraHandler}>
                                    <View style={{ ...styles.option, backgroundColor: colors.colorPaid }}>
                                        <Image source={Camera} style={IconStyle.largeIcon} />
                                        <Text style={styles.optionLabel}>Click to Scan</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.touchable, backgroundColor: "#AACBD5", marginLeft: 16 }} onPress={openGallery}>
                                    <View style={{ ...styles.option }}>
                                        <Image source={Folder} style={IconStyle.largeIcon} />
                                        <Text style={styles.optionLabel}>Select Receipt</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <AddExpenseForm
                                submit={isSubmitForm}
                                reset={resetCallback}
                                saveSuccess={saveSuccessCallback}
                                imageAttachment={base64Image}
                                accountHeadId={expenseTypeId} />
                        </View>
                    </Content>
                </View>
            </Container>
        </Root>

    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 16,
        justifyContent: 'center'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    option: {
        width: '100%',
        height: 110,
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    optionLabel: {
        marginTop: 5,
        fontSize: sizes.font_16,
    },
    attachmentContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#ECECEC',
        borderRadius: 8,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 3, //Only for Android
    },
    attachmentImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        margin: 10,
        borderColor: colors.grayDark,
        borderWidth: 0.5,
        backgroundColor: colors.lightGray,
    },
    previewImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        borderColor: colors.grayDark,
        borderWidth: 0.5,
        backgroundColor: colors.lightGray,
    },
    attachmentTextContainer: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    attachmentText: {
        fontSize: sizes.fontSm + 3
    }
});

export default AddExpense;