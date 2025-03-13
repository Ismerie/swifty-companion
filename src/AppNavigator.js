import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useStudent } from './Utils/studentContext';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
	const { student, token } = useStudent(null);
    const navigationRef = React.useRef(null);

    useEffect(() => {
        if (!token && navigationRef.current) {
            navigationRef.current.navigate('HomeScreen'); // Redirige vers HomeScreen
        }
    }, [student]);

	return (
		<>
            <StatusBar hidden={true}/>
            <NavigationContainer styles={styles.container} ref={navigationRef}>
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
 