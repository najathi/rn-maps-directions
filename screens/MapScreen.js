import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Platform, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import Colors from '../constants/Colors';
import ENV from '../env';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapScreen = props => {

	const pickedLocation = props.navigation.getParam('pickedOriginLocation');
	const mapPickedLocation = props.navigation.getParam('pickedDestLocation');

	const selectPickedLocation = props.navigation.getParam('pickedOriginSelectLocation');
	const selectMapPickedLocation = props.navigation.getParam('pickedDestSelectLocation');

	const mapRegion = {
		latitude: mapPickedLocation ? mapPickedLocation.geometry.location.lat : selectMapPickedLocation.geometry.location.lat,
		longitude: mapPickedLocation ? mapPickedLocation.geometry.location.lng : selectMapPickedLocation.geometry.location.lng,
		latitudeDelta: 2,
		longitudeDelta: 2,
	};

	let originLocation = null;
	let destinationLocation = null;
	if ((pickedLocation && mapPickedLocation) || (selectPickedLocation && selectMapPickedLocation)) {
		originLocation = {
			latitude: pickedLocation ? pickedLocation.lat : selectPickedLocation.geometry.location.lat,
			longitude: pickedLocation ? pickedLocation.lng : selectPickedLocation.geometry.location.lng
		};

		destinationLocation = {
			latitude: mapPickedLocation ? mapPickedLocation.geometry.location.lat : selectMapPickedLocation.geometry.location.lat,
			longitude: mapPickedLocation ? mapPickedLocation.geometry.location.lng : selectMapPickedLocation.geometry.location.lng
		};
	}

	console.log('originLocation', originLocation);
	console.log('destinationLocation', destinationLocation);

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={mapRegion}
				provider="google"
				zoomEnabled={true} >
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
			</MapView>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	headerButton: {
		marginHorizontal: 20
	},
	headerButtonText: {
		fontSize: 16,
		color: Platform.OS === 'android' ? 'white' : Colors.primary
	},
	errorText: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	resultContainer: {
		backgroundColor: '#fff',
		borderRadius: 10
	},
	resultText: {
		margin: 5
	}
});

export default MapScreen;