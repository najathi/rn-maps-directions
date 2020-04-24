import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import PlacesInput from 'react-native-places-input';
import ENV from '../env';

const PlacesSearchInput = props => {

	const onChange = place => {
		props.place(place.result);
	}

	return (
		<View style={{ width: '100%' }}>
			<PlacesInput
				googleApiKey={ENV().googleApiKey}
				placeHolder={props.placeHolder}
				language={"en-US"}
				requiredTimeBeforeSearch={500}
				requiredCharactersBeforeSearch={1}
				onSelect={place => {
					onChange(place)
				}}
				stylesContainer={{
					position: 'relative',
					alignSelf: 'stretch',
					margin: 0,
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					shadowOpacity: 0,
					borderColor: '#dedede',
					borderWidth: 1,
					marginBottom: 10
				}}
				stylesList={{
					borderColor: '#dedede',
					borderLeftWidth: 1,
					borderRightWidth: 1,
					borderBottomWidth: 1,
					left: -1,
					right: -1,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
});

export default PlacesSearchInput;

