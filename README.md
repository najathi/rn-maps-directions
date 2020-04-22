# rn maps directions - Najathi

## Instructions

Follow This before running the Project

First get your Google Maps Android and iOS SDK, Places and Directions API Key _(request one [here](https://developers.google.com/maps/documentation/directions/get-api-key); if you're using an existing Google Maps API Key make sure you've enabled the Google Maps,  Directions and Places API for that key using the [Google API Console](https://console.developers.google.com/apis/))_.

#### first create env.ts file and configure them..
```
const variables = {
	development: {
		googleApiKey: 'your_google_map_api'
	},
	production: {
		googleApiKey: 'your_google_map_api'
	}
};

const getEnvVariables = () => {
	if (__DEV__) {
		return variables.development; // return this if in development mode
	}
	return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
```


#### Install Packages
````
npm install
````

#### Start Application
you can use `expo start` to run the project