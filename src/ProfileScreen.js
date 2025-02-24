import React, { useEffect, useState } from 'react';
import { StyleSheet,
	Text,
	View,
	TextInput,
	SafeAreaView,
	Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';

import TopBar from './Profile/TopBar'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function ProfileScreen() {
	const { student } = useStudent();

	return (
			<SafeAreaView style={styles.container}>
				<TopBar/>
                <Text>{student.login}</Text>
            </SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
});