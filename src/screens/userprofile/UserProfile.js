import React, { Component } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import { Avatar } from 'react-native-elements'

import { colors, sizes, sizeRatio } from '../../utils/theme';

import Card from '../../common/Card';

import CustomDivider from '../../utils/CustomDivider';

const DefaultProfilePic = require('../../assets/image/profile.png');

const UserProfile = props => {

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.container}>
                <Avatar
                    rounded
                    size='xlarge'
                    source={DefaultProfilePic}
                    avatarStyle={styles.avatarStyle}
                />
                <View style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.headerText}>First Name</Text>
                            <Text style={styles.subHeaderText}>Andrew</Text>
                            <CustomDivider bg={colors.lightGray} topMargin={10} />
                            <Text style={{ ...styles.headerText, marginTop: 16 }}>Last Name</Text>
                            <Text style={styles.subHeaderText}>Dmello</Text>
                            <CustomDivider bg={colors.lightGray} topMargin={10} />
                            <Text style={{ ...styles.headerText, marginTop: 16 }}>User Name</Text>
                            <Text style={styles.subHeaderText}>andrewdmello@yahoo.co.in</Text>
                        </View>
                    </Card>
                </View>
            </View>
        </ScrollView>
    );

};

const avatarSize = 90 * sizeRatio;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 18
    },
    avatarStyle: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100,
    },
    cardContainer: {
        padding: 14,
        marginTop: 30
    },
    card: {
        width: 400,
        maxWidth: '100%',
    },
    cardContent: {
        padding: 12
    },
    headerText: {
        color: colors.lightGray, 
        fontSize: sizes.font_14, 
        fontWeight: 'bold'
    },
    subHeaderText: {
        color: colors.black, 
        fontSize: sizes.font_16, 
        fontWeight: 'bold',
        marginTop: 2
    }

});

export default UserProfile;