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
	console.log(colorCoalition);

	function addTransparencyToHex(hex, alpha) {
		hex = hex.replace(/^#/, '');
	
		if (hex.length === 3) {
			hex = hex.split('').map(c => c + c).join('');
		}
	
		if (hex.length !== 6) {
			console.warn("Format hex invalide :", hex);
			return "#FFFFFF33"; // Blanc avec 20% d'opacité par défaut
		}
	
		// Convertit alpha (0-1) en valeur hexadécimale
		let alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
	
		return `#${hex}${alphaHex}`;
	}
	

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await apiClient.get(`/users/96778`);
				if (res.status !== 200) throw new Error('Error API 42');
				if (res.data) {
					setStudent(res.data);
					// console.log(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const fetchCoallition = async () => {
			try {
				const res = await apiClient.get(`/users/96778/coalitions`);
				if (res.status !== 200) throw new Error('Error API 42');
				if (res) {
					console.log(res.data[0]);
					setColorCoalition({
						tranparence: addTransparencyToHex(res.data[0].color, 0.2),
						color: res.data[0].color
					})
					
				}
			} catch (error) {
				console.log(error);
			}
		};
	
		fetchData();
		fetchCoallition();
	}, []);
	

	return (
			<AlertNotificationRoot>
				<ImageBackground
					source={require('../assets/background42_graylight.png')}
					style={styles.backgroundImage}
					resizeMode="cover"
				>
					<SafeAreaView 
						key={colorCoalition} 
						style={[styles.container, { backgroundColor: colorCoalition.tranparence}]}>

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
							tabBarActiveTintColor: '#274c77',
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
		backgroundColor: '#cccccc',
		borderTopWidth: 1,
		borderTopColor: '#e8eddf',
	},
	backgroundImage: {
		flex: 1,
	}
});