import React, { useEffect, useState } from 'react';
import { StyleSheet,
	View,
	SafeAreaView,
	StatusBar,
	ImageBackground,
	ActivityIndicator,
} from 'react-native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { screenWidth} from './Utils/constant';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import TopBar from './Profile/TopBar'
import ProfileData from './Profile/ProfileData'
import request from './Utils/request';
import { addTransparencyToHex } from './Utils/utils';
import { logout } from './Utils/getAccessToken';

import ProjectsList from './Profile/ProjectsList';
import SkillsList from './Profile/SkillsList';

export default function ProfileScreen({ route }) {
	const { setStudent, colorCoalition ,setColorCoalition, setProjects, setSkills, token, setToken } = useStudent();
	const Tab = createMaterialTopTabNavigator();
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();
	const { studentId } = route.params;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataProfileStudent = await request.getProfileStudent(studentId, setToken); 
	
				if (dataProfileStudent.success) {
					setStudent(dataProfileStudent.data);
				} else {
					throw new Error(dataProfileStudent.error);
				}
	
				const filteredProjects = dataProfileStudent.data.projects_users.filter(
					item => item.marked === true && item.cursus_ids[0] === 21
				);
				setProjects(filteredProjects);
	
				const dataColor = await request.getColorCoalitionStudent(studentId, setToken);
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
					throw new Error(dataColor.error);
				}
				setLoading(false)	
				for (let i = 0; i < dataProfileStudent.data.cursus_users.length; i++) {
					if (dataProfileStudent.data.cursus_users[i].cursus_id === 21) {
						setSkills(dataProfileStudent.data.cursus_users[i].skills);
						break;
					} else if (i + 1 === dataProfileStudent.data.cursus_users.length) {
						setSkills([]);
					}
				}

			} catch (error) {
				//console.error("Error in handleSelectStudent:", error.message);
				Toast.show({
					type: ALERT_TYPE.DANGER,
					title: 'Error',
					textBody: 'An unexpected error occurred. Please try again later.',
				});
				setTimeout(async () => {
					await logout(setToken);
					navigation.navigate('HomeScreen');
				}, 3000);
			}
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
								<ActivityIndicator size="large" color="#333533" />
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
										if (route.name === 'Projects') iconName = 'folder-outline';
										else if (route.name === 'Skills') iconName = 'bulb-outline';
										return <Icon name={iconName} size={size} color={color} />;
									},
									tabBarStyle: styles.tabBar,
									tabBarActiveTintColor: '#495057',
									tabBarInactiveTintColor: 'gray',
									tabBarIndicatorStyle: { 
									backgroundColor: '#495057',
									},
									sceneStyle: { backgroundColor: 'transparent' }
								})}
								>
									<Tab.Screen name="Projects" component={ProjectsList} />
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