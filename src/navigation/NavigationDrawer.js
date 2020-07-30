import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    AsyncStorage,
    Alert
} from 'react-native';

import LinearGradient from "react-native-linear-gradient";
import { colors, sizes, sizeRatio } from '../utils/theme';
import CustomDivider from '../utils/CustomDivider';
import DrawerListItem from './DrawerListItem';
import Profile from './Profile';

import { Cache } from "react-native-cache";
import CacheKeys from "../database/CacheKeys";
const cache = new Cache({
    namespace: "expenzingCache",
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
});

let drawerMenuList = [
    {
        label: 'Home',
        icon: 'home',
        page: 'HomeScreen',
    },
    {
        label: 'Settings',
        icon: 'atom',
        page: 'Settings',
    },
    {
        label: 'Contact Us',
        icon: 'atom',
        page: 'ContactUs',
    },
    {
        label: 'About',
        icon: 'atom',
        page: 'About',
    },
    {
        label: 'Languages',
        icon: 'atom',
        page: 'Languages',
    },
];

let drawerProps;

export default class NavigationDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            context: this,
            menuList: drawerMenuList,
        }

    }

    componentDidMount() {
        const { context } = this.state;
        context.setState({ menuList: drawerMenuList });
    }

    handleClick = (screenToNavigate) => {
        const { drawerProps } = this.props;
        const { context } = this.state;
        drawerProps.navigation.closeDrawer();
        drawerProps.navigation.navigate(screenToNavigate);
    };

    clearData = () => {
        const { drawerProps } = this.props;
        cache.clearAll(function (err) {
            console.log('<================ LOGGED OUT ! ================>');
            drawerProps.navigation.navigate('Auth');
        });
    }

    logoutHandler = () => {
        const { drawerProps } = this.props;
        //toastMessage('Logged Out Successfully');
        drawerProps.navigation.closeDrawer();
        Alert.alert(
            'Logout',
            'Are you sure you want to logout ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Logout', onPress: () => this.clearData() },
            ],
            { cancelable: true },
        );

    }

    render() {
        const { drawerProps } = this.props;
        const { context, menuList } = this.state;
        return (
            // <LinearGradient
            //     style={styles.drawerContainer}
            //     colors={[
            //         colors.gradient_start,
            //         colors.gradient_end,
            //     ]}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            context.handleClick('UserProfile')
                        }}>
                        <Profile />
                    </TouchableOpacity>
                    <CustomDivider bg={colors.lightGray} topMargin={10} />
                    <View>
                        <FlatList
                            data={menuList}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={even => {
                                        context.handleClick(item.page);
                                    }}>
                                    <DrawerListItem
                                        item={item}
                                        active={item.page === drawerProps.activeItemKey}
                                    />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.page}
                        />
                    </View>
                    <CustomDivider bg={colors.lightGray} topMargin={0} />
                    <TouchableOpacity
                        onPress={() => { context.logoutHandler() }}>
                        <DrawerListItem
                            item={{ icon: 'logout-variant', label: 'Logout' }}
                            active={false}
                        />
                    </TouchableOpacity>
                    </View>
            // </LinearGradient>
        );

    }
};

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1
    }
});

