import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Keyboard, Animated,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
<<<<<<< HEAD
=======
    Dimensions,
>>>>>>> a271bc6 (feat: Keyboard resize Flatlist in HomeScreen)
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ListSearch from './ListSearch';
import { apiClient } from '../Utils/constant';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function SearchBar({logoOpacity, inputPosition}) {
    const [inputText, setInputText] = useState('');
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [suggestionsStudents, setSuggestionsStudents] = useState([]);
    
    console.log(suggestionsStudents)

    function handleSearch(text) {
        Keyboard.dismiss();
    }

    function handleFocus() {
        setInputIsFocused(true);
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(inputPosition, {
<<<<<<< HEAD
                toValue: -100,
=======
                toValue: -350,
>>>>>>> a271bc6 (feat: Keyboard resize Flatlist in HomeScreen)
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }

    function handleBlur() {
        setInputIsFocused(false);
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(inputPosition, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const getSuggestionsStudents = async (searchStudent) => {
        if (searchStudent.length < 3) {
            setSuggestionsStudents([]);
            return;
        }

        try {
            const res = await apiClient.get('/users', {
                params: {
                    'range[login]': `${searchStudent.toLowerCase()},${searchStudent.toLowerCase()}z` // Filtrer par login
                }
            });
            if (res.data) {
                const suggestions = res.data.map(user => ({
                    id: user.id,
                    login: user.login,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    image: user.image?.versions?.small || null
                }))
                setSuggestionsStudents(suggestions);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (inputText.length >= 3) {
                getSuggestionsStudents(inputText);
            } else {
                setSuggestionsStudents([]);
            }
        }, 100); // Attente de 500ms avant d'envoyer la requête
        
        return () => clearTimeout(delaySearch); // Annule la requête précédente si l'utilisateur tape encore
    }, [inputText]);
    
    return (
<<<<<<< HEAD
            <View style={styles.inner}>
=======
            <>
>>>>>>> a271bc6 (feat: Keyboard resize Flatlist in HomeScreen)
                <View style={[styles.inputContainer, suggestionsStudents.length > 0 && inputIsFocused ? styles.inputWidthList : null]}>
                    <Icon name="search-outline" size={24} color="#D6D6D6" />
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSearch}
                        placeholder="Search student..."
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </View>
                {suggestionsStudents.length > 0 && inputIsFocused && (
                    <ListSearch listStudents={suggestionsStudents} lengthSearch={inputText.length}/>
                )}
<<<<<<< HEAD
            </View>
=======
            </>
>>>>>>> a271bc6 (feat: Keyboard resize Flatlist in HomeScreen)

    )
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    inner: {
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    containerSearch: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
=======
>>>>>>> a271bc6 (feat: Keyboard resize Flatlist in HomeScreen)
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: 'white',
        width: '80%',
        height: screenWidth / 7.2,
        fontSize: screenWidth / 18,
    },
    input: {
        paddingVertical: 10,
        fontSize: 16,
        color: 'black',
        width: '90%'
    },
    inputWidthList: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }
});