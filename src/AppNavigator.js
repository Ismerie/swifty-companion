import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStudent } from './Utils/studentContext';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
	const { student, setStudent } = useStudent(null);

	return (
		<>
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
