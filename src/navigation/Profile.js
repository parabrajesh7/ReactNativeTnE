import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, sizes, sizeRatio } from '../utils/theme';

import { Avatar } from 'react-native-elements'

const DefaultProfilePic = require('../assets/image/profile.png');

const Profile = props => {
    return (
        <View style={styles.container}>
            {/* <View style={styles.avatar}>
              <Image
                source={Bon}
                resizeMode= 'contain'
                style={{width: avatarSize, height: avatarSize}}
              />
            </View> */}
            <Avatar
                rounded
                size = 'large'
                source={DefaultProfilePic}
                avatarStyle={styles.avatarStyle}
                />
        </View>
    );
}

const avatarSize = 90 * sizeRatio;

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderWidth: 4,
        borderColor: colors.white,
        elevation: 1,
        width: avatarSize + 8,
        height: avatarSize + 8,
        borderRadius: (avatarSize + 8) / 2,
        overflow: 'hidden',
    },
    avatarStyle : { 
        borderWidth: 2, 
        borderColor: 'white', 
        borderRadius: 100,  
    }
});

export default Profile;