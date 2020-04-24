import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import SearchScreen from '../screens/SearchScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const PlaceNavigator = createStackNavigator({
	Search: SearchScreen,
	Map: MapScreen,
},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
			},
			headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
		}
	}
);

export default createAppContainer(PlaceNavigator);