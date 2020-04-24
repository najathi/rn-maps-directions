import React from 'react';
import { StyleSheet, Dimensions, View, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';
import MapViewDirections from 'react-native-maps-directions';
import ENV from '../env';

const MapScreen = props => {

	const pickedLocation = props.navigation.getParam('pickedOriginLocation');
	const mapPickedLocation = props.navigation.getParam('pickedDestLocation');

	console.log('props.navigation', props.navigation);
	console.log('pickedLocation', pickedLocation);
	console.log('mapPickedLocation', mapPickedLocation);

	const mapRegion = {
		latitude: mapPickedLocation ? mapPickedLocation.geometry.location.lat : 6.902725,
		longitude: mapPickedLocation ? mapPickedLocation.geometry.location.lng : 8.899389,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapStyle}
				region={mapRegion}
				provider="google"
				zoomEnabled={true} >
				<Marker title="Origin Location" coordinate={{ latitude: pickedLocation.lat, longitude: pickedLocation.lng }} />
				<Marker title="Destination Location" coordinate={{ latitude: mapPickedLocation.geometry.location.lat, longitude: mapPickedLocation.geometry.location.lng }} />
				<MapViewDirections
					origin={{ latitude: pickedLocation.lat, longitude: pickedLocation.lng }}
					destination={{ latitude: mapPickedLocation.geometry.location.lat, longitude: mapPickedLocation.geometry.location.lng }}
					apikey={ENV().googleApiKey}
					strokeWidth={3}
					strokeColor="hotpink"
				/>
			</MapView>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
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
	}
});

export default MapScreen;