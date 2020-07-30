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
import { colors, sizes, sizeRatio } from '../../../utils/theme';

import { IconStyle } from '../../../utils/IconStyle';
const DoneIcon = require('../../../assets/image/done.png');

import EditExpenseForm from './EditExpenseForm';

class EditExpense extends Component {

    constructor(props) {
        super(props);

        this.state = {
            context: this,
        };

        this.closeEditExpensetHandler = this.closeEditExpensetHandler.bind(this);
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

    closeEditExpensetHandler = () => {
        const { context } = this.state;
        this.props.navigation.goBack(null);
    }

    doneButtonHandler = () => {
        const { context } = this.state;
        this.props.navigation.goBack(null);
    }

    render() {
        const { context } = this.state;
        return (
            <Root>
                <Container>
                    <View style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: colors.pri }} androidStatusBarColor={colors.black}>
                            <Left style={{ flex: 1 }}>
                                <Button transparent onPress={() => context.closeEditExpensetHandler()}>
                                    <Icon name='close' />
                                </Button>
                            </Left>
                            <Body style={{ flex: 3, alignItems: 'center', justifyContent: 'center' }}>
                                <Title>Edit Expense</Title>
                            </Body>
                            <Right style={{ flex: 1 }}>
                                <Button transparent onPress={() => context.doneButtonHandler()}>
                                    <Image source={DoneIcon} style={IconStyle.smallIcon} />
                                </Button>
                            </Right>
                        </Header>
                        <Content>
                            <View style={styles.screen}>
                                <EditExpenseForm />
                            </View>
                        </Content>
                    </View>
                </Container>
            </Root>
        );
    }

};

const styles = StyleSheet.create({
    screen: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingTop: 5,
        justifyContent: 'center'
    },
});

export default EditExpense;