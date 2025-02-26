import React, { useEffect, useState } from 'react';
import { StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	StatusBar,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth, apiClient } from './Utils/constant';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TopBar from './Profile/TopBar'
import ProfileData from './Profile/ProfileData'

import ProjectsList from './Profile/ProjectsList';
import SkillsList from './Profile/SkillsList';

export default function ProfileScreen() {
	const { student, setStudent } = useStudent();
	const Tab = createMaterialTopTabNavigator();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await apiClient.get(`/users/96778`);
				if (res.status !== 200) throw new Error('Error API 42');
				if (res.data) {
					setStudent(res.data);
					console.log(res.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
	
		fetchData();
	}, []);
	

	return (
			<SafeAreaView style={styles.container}>
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
            		backgroundColor: '#274c77', // 🔴 Change ici la couleur de l'indicateur
        },
                })}
            >
                <Tab.Screen name="Projets" component={ProjectsList} />
                <Tab.Screen name="Skills" component={SkillsList} />
            </Tab.Navigator>
            </SafeAreaView>
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
    }
});