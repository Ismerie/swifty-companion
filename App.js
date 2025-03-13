import React, {  useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import AppNavigator from './src/AppNavigator';
import { StudentProvider } from './src/Utils/studentContext'
import { useSetupApiClient } from './src/Utils/useSetUpApiClient';

export default function App() {

	useEffect(() => {
		if (Platform.OS != 'web') {
			NavigationBar.setVisibilityAsync('hidden');
			NavigationBar.setBackgroundColorAsync('transparent');
			NavigationBar.setBehaviorAsync('overlay-swipe');
		}
	}, []);
	
	return (
			<StudentProvider>
				<AppNavigator />
			</StudentProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});