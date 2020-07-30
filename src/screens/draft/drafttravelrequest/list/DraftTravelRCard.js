import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes, sizeRatio } from '../../../../utils/theme';

const DraftTravelRCard = props => {

    return (
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );

}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.26,
        elevation: 3, //Only for Android
        backgroundColor: colors.white
    },
    
});


export default DraftTravelRCard;