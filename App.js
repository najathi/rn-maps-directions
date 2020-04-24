import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import PlacesNavigator from './navigation/PlacesNavigator';

const getFonts = () => Font.loadAsync({
  'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.otf'),
  'Montserrat-Light': require('./assets/fonts/Montserrat-Light.otf'),
  'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.otf'),
  'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.otf'),
});

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <PlacesNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
  },
});
