import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    ActivityIndicator
} from 'react-native';
import { sizes } from '../utils/theme';

const Loader = props => {
    const {
        loading,
        loadingText,
        ...attributes
    } = props;

    return (
        <Modal transparent={true} animationType={'none'} onRequestClose={() => { console.log('close modal') }} visible={loading}>
            <View style={{ flex: 1, backgroundColor: '#00000040', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                    <Text style={styles.loadingTitle}>{loadingText}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    // modalBackground: {
    //     flex: 1,
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     backgroundColor: '#00000040'
    // },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 20,
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5, //Only for Android 
    },
    loadingTitle : {
        fontSize: sizes.font_16, 
        fontFamily: 'Nunito-Regular',
        marginStart: 14
    }
});

export default Loader;