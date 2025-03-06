import React, { useState, useEffect } from 'react';
import { StyleSheet,
    View,
    TextInput,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import ListSearch from './ListSearch';
import { apiClient, screenWidth, screenHeight } from '../Utils/constant';

export default function SearchBar({handleBlur, handleFocus, inputIsFocused}) {
    const [inputText, setInputText] = useState('');
    const [suggestionsStudents, setSuggestionsStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(true);
    const [lengthSearch, setLenghtSearch] = useState(0)

    function handleSearch(text) {
        Keyboard.dismiss();
    }

    const getSuggestionsStudents = async (searchStudent) => {
        if (searchStudent.length < 3) {
            setSuggestionsStudents([]);
            return;
        }

        try {
            const res = await apiClient.get('/users', {
                params: {
                    'range[login]': `${searchStudent.toLowerCase()},${searchStudent.toLowerCase()}zzz`
                }
            });
            if (res.status != "200") throw new Error('Error API 42');
            if (res.data.length > 0) {
                const suggestions = res.data.map(user => ({
                    id: user.id,
                    login: user.login,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    image: user.image?.versions?.small || null
                }))
                setSuggestionsStudents(suggestions);
                setLenghtSearch(inputText.replace(/[ .]/g, "").length);
            }
            else if (res.data.length === 0) {
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'No results',
                    textBody: 'No student found.',
                });
                setSuggestionsStudents([]);
                setLenghtSearch(0);
            }
        }
        catch (error) {
            console.log(error)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Error connecting to API 42. Retry later.',
            });
            
        }
        setLoading(false);
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (inputText.length >= 3) {
                setLoading(true);
                getSuggestionsStudents(inputText.replace(/[ .]/g, ""));
            } else {
                setSuggestionsStudents([]);
                setLenghtSearch(0);
            }
        }, 500); // Attente de 500ms avant d'envoyer la requête

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            clearTimeout(delaySearch)
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    
    }, [inputText]);
    
    return (
        <>
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
                {loading && (
                    <ActivityIndicator style={styles.loader} size="small" color="gray"/>
                )}
            </View>
            {suggestionsStudents.length > 0 && inputIsFocused && (
                <ListSearch listStudents={suggestionsStudents} lengthSearch={lengthSearch}/>
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
        width: '90%',
    },
    inputWidthList: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    loader: {
        flex : 1,
    }
});
