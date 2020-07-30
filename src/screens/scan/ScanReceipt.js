import React, { Component } from 'react';
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

import { Container, Header, Icon, Button, Body, Content, Left, Right, Title, Fab, Toast, Root } from 'native-base';
import { colors, sizes, sizeRatio } from '../../utils/theme';

import { IconStyle } from '../../utils/IconStyle';
const DoneIcon = require('../../assets/image/done.png');
const SampleReceipt = require('../../assets/image/sample_receipt.png');

import NavigationService from '../../navigation/NavigationService';

class ScanReceipt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
        };

        this.closeScanReceiptHandler = this.closeScanReceiptHandler.bind(this);
        this.doneButtonHandler = this.doneButtonHandler.bind(this);
        this.toastMessage = this.toastMessage.bind(this);
    }

    toastMessage = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    closeScanReceiptHandler = () => {
        const { context } = this.state;
        this.props.navigation.goBack(null);
    }

    doneButtonHandler = () => {
        const { context } = this.state;
        this.props.navigation.goBack(null);
    }

    render() {
        return (
            <Root>
                <Container>
                    <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                        <Left style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.closeScanReceiptHandler()}>
                                <Icon name='close' />
                            </Button>
                        </Left>
                        <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                            <Title>Scan Receipt</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <Button transparent onPress={() => this.doneButtonHandler()}>
                                <Image source={DoneIcon} style={IconStyle.smallIcon} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.imageContainer}>
                        <Image
                            resizeMode = 'cover'
                            source={SampleReceipt}
                            style={styles.previewImage} />
                        </View>
                    </Content>
                </Container>
            </Root>
        );
    }

}

const styles = StyleSheet.create({

    imageContainer: {
        margin: 16,
        height: '100%',
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
        borderRadius: 5,
        borderColor: colors.grayDark,
        borderWidth: 0.5,
        backgroundColor: colors.lightGray,
    },

});

export default ScanReceipt;