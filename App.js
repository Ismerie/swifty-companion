import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import AppNavigator from './src/AppNavigator';
import { StudentProvider } from './src/Utils/studentContext'

export default function App() {

	useEffect(() => {
		if (Platform.OS != 'web') {
			NavigationBar.setVisibilityAsync('hidden');
			NavigationBar.setBackgroundColorAsync('transparent');
			NavigationBar.setBehaviorAsync('overlay-swipe');
		}
	}, []);

	// Si l'utilisateur est connecté, il est redirigé vers ProfileScreen, sinon vers LoginScreen
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