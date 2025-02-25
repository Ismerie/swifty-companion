import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleButtonBack = () => {
        navigation.navigate('HomeScreen');
    }

    return (
            <>
                <TouchableOpacity style={styles.container} onPress={() => handleButtonBack()}>
                    <Icon name="arrow-back-outline" size={24} color="black" />
                    <Text style={styles.font}>Back</Text>
                </TouchableOpacity>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: spacing,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    font: {
        fontSize: 18,
        marginLeft: 5,
    }
});