import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useStudent } from './Utils/studentContext';

export default function ProfileScreen() {
	const { student } = useStudent();

	return (
			<View style={styles.container}>
                <Text>{student.login}</Text>
            </View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});