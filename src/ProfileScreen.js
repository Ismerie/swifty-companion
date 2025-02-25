import React, { useEffect, useState } from 'react';
import { StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth, apiClient } from './Utils/constant';

import TopBar from './Profile/TopBar'
import ProfileData from './Profile/ProfileData'

export default function ProfileScreen() {
	const { student, setStudent } = useStudent();
	

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
				<TopBar/>
				<ProfileData/>
                <Text>Hello</Text>
            </SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
});