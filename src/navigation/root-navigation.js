import React from 'react';
import {
    View,
    ActivityIndicator,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    StyleSheet,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Divider } from 'react-native-paper';

import NavigationDrawer from './NavigationDrawer';

import Login from '../screens/auth/Login'
import HomeScreen from '../screens/home/HomeScreen';
import Settings from '../screens/settings/Settings';
import ContactUs from '../screens/contactus/ContactUs';
import About from '../screens/about/About';
import Languages from '../screens/languages/Languages';
import SplashScreen from '../screens/splashscreen/SplashScreen';
import BusinessExpense from '../screens/expense/BusinessExpense';
import AddExpense from '../screens/expense/AddExpense';
import ScanReceipt from '../screens/scan/ScanReceipt';
import TravelRequest from '../screens/travelreq/TravelRequest';
import TravelSettlement from '../screens/travelsettle/TravelSettlement';
import DraftExpense from '../screens/draft/draftexpense/DraftExpense';
import PendingExpense from '../screens/pending/pendingexpense/PendingExpense';
import DraftTR from '../screens/draft/drafttravelrequest/DraftTR';
import PendingTravelRequest from '../screens/pending/pendingtr/PendingTravelRequest';
import DraftDetails from '../screens/draft/draftexpense/DraftDetails';
import MyApproval from '../screens/myapproval/MyApproval';
import UserProfile from '../screens/userprofile/UserProfile'; 
import EditExpense from '../screens/draft/draftexpense/EditExpense';

import { colors, sizes, sizeRatio } from '../utils/theme';
import DrawerListItem from './DrawerListItem';
import Profile from './Profile';

import CustomDivider from '../utils/CustomDivider';


const MenuIcon = require('../assets/image/menu.png');
const BackIcon = require('../assets/image/arrow_back.png');

const toastMessage = (message) => {
    ToastAndroid.showWithGravity(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
}


// Navigation Drawer
const AppDrawer = createDrawerNavigator(
    {
        // List of Drawer screens
        HomeScreen: {
            screen: HomeScreen,
        },
        Settings: {
            screen: Settings,
        },
        ContactUs: {
            screen: ContactUs,
        },
        About: {
            screen: About,
        },
        Languages: {
            screen: Languages,
        },
        UserProfile: {
            screen: UserProfile
        }
    },
    {
        // Initial Route , Drawer width & Design of the Drawer
        initialRouteName: 'HomeScreen',
        drawerWidth: (sizes.wW / 3) * 2,
        contentComponent: (props) => (
            <NavigationDrawer
                drawerProps={props} />),

    },
);

// Auth screens stack
const AuthStack = createStackNavigator({

    SignIn: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    }

});

// Loading screen for Authorization
class AuthLoadingScreen extends React.Component {


    constructor(props) {
        super(props);
        this._appEntryAsync(props);
    }

    validateUser = () => {

    }

    //Allow user to enter the app if he/she has already logged in
    _appEntryAsync = async (props) => {

        setTimeout(() => { props.navigation.navigate('Auth') }, 2000);

    };


    // Render loading
    render() {
        return (
            <SplashScreen />
        );
    }
}

const App = createAppContainer(
    createSwitchNavigator({
        App: createStackNavigator({
            Root: {
                screen: AppDrawer,
                navigationOptions: ({ navigation }) => {

                    return {
                        title: 'Expenzing',
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: colors.pri,
                        },
                        headerLeft: () => (
                            <TouchableOpacity
                                style={{ paddingLeft: sizes.spaceMd }}
                                onPress={() => navigation.toggleDrawer()}>
                                <Image source={MenuIcon} style={styles.menuStyle} />
                                {/* <Image source={navigation.state.isDrawerOpen ? BackIcon : MenuIcon} style={styles.menuStyle} /> */}
                            </TouchableOpacity>
                        ),
                    };
                },
            },
            //Other App Screens
            BusinessExpense: {
                screen: BusinessExpense,
                navigationOptions: {
                    headerShown: false
                }
            },
            AddExpense: {
                screen: AddExpense,
                navigationOptions: {
                    headerShown: false
                }
            },

            ScanReceipt: {
                screen: ScanReceipt,
                navigationOptions: {
                    headerShown: false
                }
            },
            TravelRequest: {
                screen: TravelRequest,
                navigationOptions: {
                    headerShown: false
                }
            },
            TravelSettlement: {
                screen: TravelSettlement,
                navigationOptions: {
                    headerShown: false
                }
            },
            DraftExpense: {
                screen: DraftExpense,
                navigationOptions: {
                    headerShown: false
                }
            },
            PendingExpense: {
                screen: PendingExpense,
                navigationOptions: {
                    headerShown: false
                }
            },
            DraftTR: {
                screen: DraftTR,
                navigationOptions: {
                    headerShown: false
                }
            },
            PendingTravelRequest: {
                screen: PendingTravelRequest,
                navigationOptions: {
                    headerShown: false
                }
            },
            DraftDetails: {
                screen: DraftDetails,
                navigationOptions: {
                    headerShown: false
                }
            },
            MyApproval: {
                screen: MyApproval,
                navigationOptions: {
                    headerShown: false
                }
            },
            EditExpense: {
                screen: EditExpense,
                navigationOptions: {
                    headerShown: false
                }
            }

        }),
        Auth: AuthStack,
        AuthLoading: AuthLoadingScreen,
    },
        {
            initialRouteName: 'AuthLoading',
        }
    ),
);

const styles = StyleSheet.create({

    menuStyle: {
        height: sizes.font_18,
        width: sizes.font_18,
        marginRight: sizes.spaceMd,
    },
    drawerContainer: {
        flex: 1
    }
});

export default App;