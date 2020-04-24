import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import PlacesSearchInput from '../components/PlacesSearchInput';
import HeaderButton from '../components/HeaderButton';

const SearchScreen = props => {

	const [pickedLocation, setPickedLocation] = useState();
	const [designation, setDesignation] = useState();

	const [selectPickedLocation, setSelectPickedLocation] = useState();
	const [selectDesignation, setSelectDesignation] = useState();

	useEffect(() => {
		if (Platform.OS === 'android' && !Constants.isDevice) {
			setErrorMsg(
				'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			);
		} else {
			(async () => {
				let { status } = await Location.requestPermissionsAsync();
				if (status !== 'granted') {
					Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.', [{ text: 'Okay' }]);
				}

				try {
					let location = await Location.getCurrentPositionAsync({});
					setPickedLocation({
						lat: location.coords.latitude,
						lng: location.coords.longitude,
					});
				}
				catch (err) {
					Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{ text: 'Okay' }]);
				}

			})();
		}
	}, []);

	const onDestinationHandler = coordinate => {
		setDesignation(coordinate);
	}

	const onOriginHandler = coordinate => {
		setSelectPickedLocation(coordinate);
	}

	const onDestinationSelectHandler = coordinate => {
		setSelectDesignation(coordinate);
	}

	return (
		<View style={styles.container}>
			<View style={{ ...styles.inputContainer }}>
				<PlacesSearchInput placeHolder="Search Start Place..." place={onOriginHandler} />
				<PlacesSearchInput placeHolder="Search Destination Place..." place={onDestinationSelectHandler} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Go"
					color={Platform.OS === 'android' ? 'red' : 'white'}
					onPress={() => props.navigation.navigate('Map', { pickedOriginSelectLocation: selectPickedLocation, pickedDestSelectLocation: selectDesignation })}
				/>
			</View>
			<View style={styles.inputContainer}>
				<PlacesSearchInput placeHolder="Search Destination Place..." place={onDestinationHandler} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Go"
					color={Platform.OS === 'android' ? 'blue' : 'white'}
					onPress={() => props.navigation.navigate('Map', { pickedOriginLocation: pickedLocation, pickedDestLocation: designation })}
				/>
			</View>
		</View>
	);
};

SearchScreen.navigationOptions = navData => {
	return {
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Menu" iconName='ios-menu' onPress={() => {
					navData.navigation.toggleDrawer()
				}} />
			</HeaderButtons>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center'
	},
	buttonContainer: {
		padding: 10,
		width: 100
	},
	inputContainer: {
		width: '95%',
		marginTop: 10
	}
});

export default SearchScreen;