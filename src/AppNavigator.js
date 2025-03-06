import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStudent } from './Utils/studentContext';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
	const { student } = useStudent(null);

	return (
		<>
            <StatusBar hidden={true}/>
            <NavigationContainer styles={styles.container}>
                <Stack.Navigator
                    initialRouteName={student ? "ProfileScreen" : "HomeScreen"}
                    screenOptions={({ route, navigation }) => ({
                        headerShown: false,
                    })}
                >
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                </Stack.Navigator>
            </NavigationContainer>

        </>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
