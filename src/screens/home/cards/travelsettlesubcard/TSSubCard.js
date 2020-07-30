import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, sizes, sizeRatio } from '../../../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';

const TSSubCard = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
        // <LinearGradient
        //     start={{ x: 0, y: 0 }}
        //     end={{ x: 1, y: 1 }}
        //     colors={[colors.black, props.cardColor]}
        //     style={{ ...styles.card, ...props.style }}>
        //     {props.children}
        // </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black', //Shadow related are only for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 3, //Only for Android
        borderRadius: 8,
        backgroundColor: colors.pri
    },
});

export default TSSubCard;