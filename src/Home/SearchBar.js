import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Keyboard, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ListSearch from './ListSearch';
import { apiClient } from '../Utils/constant';

export default function SearchBar({logoOpacity, inputPosition}) {
    const [inputText, setInputText] = useState('');
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const [suggestionsStudents, setSuggestionsStudents] = useState([]);
    
    function handleSearch(text) {
        Keyboard.dismiss;
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
                toValue: -200,
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
                duration: 300,
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
                console.log(res.data)
                res.data.forEach(user => {
                    console.log(user.login);
                });
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchSuggestions = async () => {
            console.log(inputText)
            if (inputText)
                await getSuggestionsStudents(inputText);
            else
                setSuggestionsStudents([]);
        };
        fetchSuggestions();
    }, [inputText])
    
    return (
        <View style={styles.containerSearch}>
            <View style={styles.inputContainer}>
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
            <ListSearch />
        </View>
    );
}

const styles = StyleSheet.create({
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
    inputContainer: {
        flexDirection: 'row', // Place l'icône et le champ côte à côte
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
  paddingHorizontal: 10,
        width: 300,
    },
    input: {
        flex: 1, // Prend tout l'espace restant
        paddingVertical: 10,
        fontSize: 16,
        color: 'black',
    },
});