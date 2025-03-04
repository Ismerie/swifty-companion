import React, { useEffect, useState } from 'react';
import { StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	StatusBar,
	ImageBackground,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { screenHeight, screenWidth, apiClient } from './Utils/constant';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from './Profile/TopBar'
import ProfileData from './Profile/ProfileData'

import ProjectsList from './Profile/ProjectsList';
import SkillsList from './Profile/SkillsList';

export default function ProfileScreen() {
	const { student, setStudent, colorCoalition ,setColorCoalition } = useStudent();
	const Tab = createMaterialTopTabNavigator();

	return (
			<AlertNotificationRoot>
				<ImageBackground
					source={require('../assets/background42_graylight.png')}
					style={styles.backgroundImage}
					resizeMode="cover"
				>
					<SafeAreaView 
						key={colorCoalition} 
						style={[styles.container, { backgroundColor: colorCoalition.transparence}]}>

						<StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
						<View style={{padding: screenWidth * 0.05}}>
							<TopBar/>
							<ProfileData/>
						</View>
						<Tab.Navigator tabBarPosition='bottom'
						screenOptions={({ route }) => ({
							tabBarIcon: ({ color, size }) => {
								let iconName;
								if (route.name === 'Projets') iconName = 'folder-outline';
								else if (route.name === 'Skills') iconName = 'bulb-outline';
								return <Icon name={iconName} size={size} color={color} />;
							},
							tabBarStyle: styles.tabBar,
							tabBarActiveTintColor: '#495057',
							tabBarInactiveTintColor: 'gray',
							tabBarIndicatorStyle: { 
							backgroundColor: '#274c77',
							},
							sceneStyle: { backgroundColor: 'transparent' }
						})}
						>
							<Tab.Screen name="Projets" component={ProjectsList} />
							<Tab.Screen name="Skills" component={SkillsList} />
						</Tab.Navigator>
					</SafeAreaView>
				</ImageBackground>
			</AlertNotificationRoot>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		backgroundColor: '#e9ecef',
		borderTopWidth: 1,
		borderTopColor: '#cccccc',
	},
	backgroundImage: {
		flex: 1,
	}
});