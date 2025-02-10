import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function ProfileScreen() {

	return (
			<View style={styles.container}>
                <Text>Profile Screen</Text>
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