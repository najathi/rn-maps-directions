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