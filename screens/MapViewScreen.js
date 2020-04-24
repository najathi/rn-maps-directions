import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

import PlacesSearchInput from '../components/PlacesSearchInput';
import TouchableNative from '../components/TouchableNative';
import ENV from '../env';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapViewScreen = props => {

	const [pickedLocation, setPickedLocation] = useState();
	const [destination, setDestination] = useState();

	// const originLocation = { latitude: 37.3318456, longitude: -122.0296002 };
	// const destinationLocation = { latitude: 37.771707, longitude: -122.4053769 };

	console.log('pickedLocation', pickedLocation);
	console.log('destination', destination);

	// const mapRegion = {
	// 	latitude: destination ? destination.geometry.location.lat : pickedLocation.lat,
	// 	longitude: destination ? destination.geometry.location.lng : pickedLocation.lng,
	// 	latitudeDelta: 2,
	// 	longitudeDelta: 2,
	// };

	const mapRegion = {
		latitude: pickedLocation ? pickedLocation.lat : 6.902725,
		longitude: pickedLocation ? pickedLocation.lng : 79.899389,
		latitudeDelta: 2,
		longitudeDelta: 2,
	};

	let originLocation = null;
	let destinationLocation = null;
	if (pickedLocation && destination) {
		originLocation = {
			latitude: pickedLocation.lat,
			longitude: pickedLocation.lng
		};

		destinationLocation = {
			latitude: destination.geometry.location.lat,
			longitude: destination.geometry.location.lng
		};
	}

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
		setDestination(coordinate);
	}

	const locationPickedHandler = () => {
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
	}

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<PlacesSearchInput placeHolder="Search Destination Place..." place={onDestinationHandler} />
			</View>
			<MapView
				style={styles.mapStyle}
				region={mapRegion}
				provider="google"
				zoomEnabled={true} >
				{pickedLocation && destination ? < View >
					<Marker title="Origin Location" coordinate={originLocation} />
					<Marker title="Destination Location" coordinate={destinationLocation} />
					<MapViewDirections
						origin={originLocation}
						destination={destinationLocation}
						apikey={ENV().googleApiKey}
						strokeWidth={4}
						strokeColor="hotpink"
						mode='DRIVING'

					/>
				</View> : null}
			</MapView>
			<TouchableNative styleTouchable={styles.textContainer} onPressed={locationPickedHandler}>
				<Ionicons name="md-locate" size={35} />
			</TouchableNative>
		</View >
	);
}

MapViewScreen.navigationOptions = navigationData => {
	return {
		headerTitle: 'Map View'
	};
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		flex: 1
	},
	inputContainer: {
		width: '95%',
		marginTop: 5,
		position: 'absolute'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	textContainer: {
		bottom: 0,
		right: 0,
		position: 'absolute',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		margin: 30,
		backgroundColor: '#ccc',
		padding: 15,
		borderRadius: 80
	}
});


export default MapViewScreen;