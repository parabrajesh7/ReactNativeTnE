import React, { Component } from 'react';

import App from '../ExpenzingTnE/src/navigation/root-navigation';
import NavigationService from '../ExpenzingTnE/src/navigation/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import { enableScreens } from 'react-native-screens';
 
Icon.loadFont();
MaterialCommunityIcons.loadFont();
MaterialIcons.loadFont();
Ionicons.loadFont();

console.disableYellowBox = true;


export default class AppContainer extends Component {
    render() {
        return (
            <App
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />
        );
    }
}