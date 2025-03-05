import React, { useEffect, useState } from 'react';
import { StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	StatusBar,
	ImageBackground,
	ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { screenHeight, screenWidth, apiClient } from './Utils/constant';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

import TopBar from './Profile/TopBar'
import ProfileData from './Profile/ProfileData'
import request from './Utils/request';
import { addTransparencyToHex } from './Utils/utils';

import ProjectsList from './Profile/ProjectsList';
import SkillsList from './Profile/SkillsList';

export default function ProfileScreen({ route }) {
	const { student, projects, skills, setStudent, colorCoalition ,setColorCoalition, setProjects, setSkills } = useStudent();
	const Tab = createMaterialTopTabNavigator();
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();
	const { studentId } = route.params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataProfileStudent = await request.getProfileStudent(studentId); 
	
				if (dataProfileStudent.success) {
					setStudent(dataProfileStudent.data);
				} else {
					throw new Error('Error API 42');
				}
	
				const filteredProjects = dataProfileStudent.data.projects_users.filter(
					item => item.marked === true && item.cursus_ids[0] === 21
				);
				setProjects(filteredProjects);
	
				for (let i = 0; i < dataProfileStudent.data.cursus_users.length; i++) {
					if (dataProfileStudent.data.cursus_users[i].cursus_id === 21) {
						setSkills(dataProfileStudent.data.cursus_users[i].skills);
						break;
					} else if (i + 1 === dataProfileStudent.data.cursus_users.length) {
						setSkills([]);
					}
				}
	
				const dataColor = await request.getColorCoalitionStudent(studentId);
				if (dataColor.success && dataColor.data) {
					setColorCoalition({
						transparence: addTransparencyToHex(dataColor.data, 0.2),
						color: dataColor.data
					});
				} else if (dataColor.success) {
					setColorCoalition({
						transparence: "#FFFFFF33",
						color: "#FFFFFF"
					});
				} else {
					throw new Error('Error API 42');
				}

			} catch (error) {
				console.error("Error in handleSelectStudent:", error);
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: 'Error',
					textBody: 'An unexpected error occurred. Please try again later.',
				});
			}
			setLoading(false)
		};
		fetchData();
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
						style={[styles.container, { backgroundColor: loading ? 'transparence' : colorCoalition.transparence}]}>

						<StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
						{loading ? (
							<View style={styles.loadingContainer}>
								<ActivityIndicator size="large" color="gray" />
							<Text style={styles.loadingText}>Chargement...</Text>
						</View>
						):(
							<>
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
							</>
						)}
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
	},
	loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});