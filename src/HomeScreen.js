import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet,
    View,
    TextInput,
    ImageBackground,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Animated,
    StatusBar,
	FlatList,
	TouchableOpacity,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { getAccessToken } from './Utils/getAccessToken';
import { apiClient } from './Utils/constant';

import ListSearch from './Home/ListSearch'

export default function HomeScreen() {
    const [inputText, setInputText] = useState('');
    const [inputIsFocused, setInputIsFocused] = useState(false);
    // Animated values
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const inputPosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            apiClient.interceptors.request.use(
                (config) => {
                    config.headers.Authorization - `Bearer ${token}`;
                }
            )
        }
    }, [])

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

	function handleSearch(text) {
        setInputText(text);
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStudents(filtered);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <ImageBackground
                        source={require('../assets/background42.png')}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                    >
                        {/* Logo with animated opacity */}
                        <Animated.View style={[styles.containerTitle, { opacity: logoOpacity }]}>
                            <Image
                                style={styles.logo}
                                source={require('../assets/42logo.png')}
                            />
                        </Animated.View>

                        {/* TextInput with animated position */}
                        <Animated.View style={[styles.containerTitle, { transform: [{ translateY: inputPosition }] }]}>
                            <View style={styles.containerSearch}>
								<View style={styles.inputContainer}>
									<Icon name="search-outline" size={24} color="#D6D6D6" />
									<TextInput
										style={styles.input}
										value={inputText}
										onChangeText={handleSearch}
										onSubmitEditing={Keyboard.dismiss}
										placeholder="Search student..."
										onFocus={handleFocus}
										onBlur={handleBlur}
									/>
								</View>
                                <ListSearch />
                            </View>
                        </Animated.View>
                        <StatusBar style="auto" />
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    innerContainer: {
        flex: 1,
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerSearch: {
		flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    input: {
        flex: 1, // Prend tout l'espace restant
        paddingVertical: 10,
        fontSize: 16,
        color: 'black',
    },
	inputContainer: {
        flexDirection: 'row', // Place l'icône et le champ côte à côte
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
		paddingHorizontal: 10,
        width: 300,
    },
    backgroundImage: {
        flex: 1,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});