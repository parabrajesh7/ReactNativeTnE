import React from 'react';
import {View, StyleSheet} from 'react-native';


const CustomDivider = props => {
    return (
        <View style={{...styles.divider, 
            backgroundColor: props.bg , 
            marginTop : props.topMargin,
            marginStart: props.marginS,
            marginEnd: props.marginE}}/>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomDivider;