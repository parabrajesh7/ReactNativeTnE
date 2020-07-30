import React, { Component } from 'react';

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

import ESubCard from '../cards/expensesubcard/ESubCard';

import NavigationService from '../../../navigation/NavigationService';

const CreditCard = props => {

    return (
        <View style={styles.screen}>
            <Card style={styles.cardConatiner} showAction= {false}>
                <View>
                    <CardTitle title={'CARDS (1)'} />
                    <View style={{ padding: 20 }}>
                        <ESubCard style={styles.cardConatiner} cardColor={'#86A0A8'}>
                            <View style={{ padding: 10 }}>
                                <View>
                                    <Text style={styles.creditCardText}>ICICI BANK</Text>
                                </View>
                                <View style={{height: 70, marginTop: 10}}>
                                    <Text style={styles.creditCardText}>XXXX-XXXX-XXXX-1234</Text>
                                </View>
                                <View>
                                    <Text style={styles.creditCardText}>PRIYANK PATIL</Text>
                                </View>
                            </View>
                        </ESubCard>
                        <View style={{ marginTop: 20 }}>
                            <ESubCard style={styles.cardConatiner} cardColor={'#86A0A8'}>
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.creditCardText}>NOT CLAIMED TRANSACTIONS</Text>
                                        </View>
                                        <Text style={styles.creditCardText}>121</Text>
                                    </View>
                                </View>
                            </ESubCard>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <ESubCard style={styles.cardConatiner} cardColor={'#86A0A8'}>
                                <View style={{ padding: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.creditCardText}>PAYMENT PENDING</Text>
                                        </View>
                                        <Text style={styles.creditCardText}>2208 INR</Text>
                                    </View>
                                </View>
                            </ESubCard>
                        </View>

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
    creditCardText: {
        fontSize: sizes.font_14, 
        fontWeight: 'bold', 
        color: colors.white
    }

});

export default CreditCard;