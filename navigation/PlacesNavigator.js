import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

import SearchScreen from '../screens/SearchScreen';
import MapScreen from '../screens/MapScreen';
import MapViewScreen from '../screens/MapViewScreen';
import Colors from '../constants/Colors';

const defaultStackNavOption = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
	headerTitleStyle: {
		fontWeight: 'bold'
	},
	headerBackTitleStyle: {
		fontWeight: 'normal'
	}
};

const PlaceNavigator = createStackNavigator({
	Search: SearchScreen,
	Map: MapScreen,
},
	{
		defaultNavigationOptions: defaultStackNavOption
	}
);

const MapNavigator = createStackNavigator({
	MapView: MapViewScreen
},
	{
		defaultNavigationOptions: defaultStackNavOption
	}
);

const tabsScreenConfig = {
	Meals: {
		screen: PlaceNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<FontAwesome5 name="search-location" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primaryColor,
			// tabBarLabel: 'Meals!!!'
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontWeight: 'bold' }}>Search</Text> : 'Meals'
		}
	},
	Favorite: {
		screen: MapNavigator,
		navigationOptions: {
			tabBarLabel: 'Maps!',
			tabBarIcon: tabInfo => {
				return (
					<Entypo name="location" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontWeight: 'bold' }}>Maps</Text> : 'Maps'
		}
	}
}

const PlaceTabNavigator = Platform.OS === "android" ?
	createMaterialBottomTabNavigator(tabsScreenConfig,
		{
			activeColor: 'white',
			shifting: true,
			// shifting: false,
			barStyle: {
				backgroundColor: Colors.primaryColor
			}
		}
	) :
	createBottomTabNavigator(tabsScreenConfig, {
		tabBarOptions: {
			labelStyle: {
				fontWeight: 'normal'
			},
			activeTintColor: Colors.accentColor
		}
	});

const MainNavigation = createDrawerNavigator({
	Search: {
		screen: PlaceTabNavigator,
		navigationOptions: {
			drawerLabel: 'Search'
		},
	},
	MapView: MapNavigator
}, {
	contentOptions: {
		activeTintColor: Colors.accentColor,
		labelStyle: {
			fontWeight: 'bold'
		}
	}
});


export default createAppContainer(MainNavigation);