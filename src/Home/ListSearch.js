import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import axios from 'axios';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function ListSearch({listStudents, lengthSearch}) {
    const [isKeyboardVisible, setKeyboardVisible] = useState(true);

    console.log(listStudents)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <View style={[styles.container, { maxHeight: isKeyboardVisible ? screenHeight / 3 : screenHeight / 1.5 }]}>
            <FlatList
                style={[styles.containerList, { maxHeight: isKeyboardVisible ? screenHeight / 3 : screenHeight / 1.5 }]}
                data={listStudents}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="handled" 
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                    {item.image != null ? (
                        <Image source={{ uri: item.image}} style={styles.image} />
                    ):(
                        <Image source={require('./../../assets/default_profile_picture.jpg')} style={styles.image} />
                    )}
                        <Text style={styles.loginBold}>{item.login.substring(0, lengthSearch)}</Text> 
                        <Text style={styles.login}>{item.login.substring(lengthSearch)}</Text> 
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
		backgroundColor: '#fff',
        borderRadius: 5,
        width: '80%',
		maxHeight: screenHeight / 3,
    },
    containerList: {
        position: "absolute",
        maxHeight: screenHeight / 3,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingBottom: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    loginBold: {
        fontWeight: 'bold',
        marginLeft: 10,
    }
});