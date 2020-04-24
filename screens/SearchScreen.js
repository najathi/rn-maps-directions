import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

import PlacesSearchInput from '../components/PlacesSearchInput';

const SearchScreen = props => {

	const [pickedLocation, setPickedLocation] = useState();
	const [designation, setDesignation] = useState();

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

	const verifyPermissions = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			Alert.alert('Insufficient permissions!', 'You need to grant location permissions to use this app.', [{ text: 'Okay' }]);
			return false;
		}
		return true;
	};

	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();
		console.log('hasPermission', hasPermission);
		if (!hasPermission) {
			return;
		}

		try {
			const location = await Location.getCurrentPositionAsync();
			setPickedLocation(location.coords);
			console.log('location', location);
			console.log('pickedLocation', pickedLocation);
		}
		catch (err) {
			Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{ text: 'Okay' }]);
		}
	}

	const onDestinationHandler = coordinate => {
		setDesignation(coordinate);
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<PlacesSearchInput placeHolder="Search Destination Place..." place={onDestinationHandler} />
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Go"
					color={Platform.OS === 'android' ? 'red' : 'white'}
					onPress={() => props.navigation.navigate('Map', { pickedOriginLocation: pickedLocation, pickedDestLocation: designation })}
				/>
			</View>
		</View>
	);
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