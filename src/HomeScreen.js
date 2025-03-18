import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from './Home/SearchBar'
import { screenHeight, screenWidth } from './Utils/constant';
import { signInWith42 } from './Utils/getAccessToken';
import { useStudent } from './Utils/studentContext';
import { getStoredToken, logout } from './Utils/getAccessToken';


export default function HomeScreen() {
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [inputIsFocused, setInputIsFocused] = useState(false);
    const { token, setToken } = useStudent();
    const [loading, setLoading] = useState(true);

    const handleSignIn = () => {
        signInWith42(setToken);
    }

    const handleLogout = () => {
        logout(setToken);
    }

    function handleFocus() {
        setInputIsFocused(true);
        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -screenHeight * 0.3,
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
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
        Keyboard.dismiss();
    }

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await getStoredToken();
            setToken(storedToken ? true : false);
            setLoading(false);
        };
        fetchToken();
    }, []);

    return (
        <AlertNotificationRoot>        
            <ImageBackground
                source={require('../assets/background42.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <TouchableWithoutFeedback onPress={handleBlur} accessible={false}>
                    <SafeAreaView style={styles.container}>
                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#333533" />
                            </View>
                        ) : (
                            <>
                                {token && (
                                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                        <Icon name="log-out-outline" size={24} color="#fff" />
                                    </TouchableOpacity>
                                )}

                                <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
                                    <Animated.Image 
                                        source={require('../assets/42logo.png')}
                                        style={[styles.logo, { opacity: logoOpacity, display: inputIsFocused ? 'none' : 'flex' }]}
                                    />
                                    <View style={styles.contentContainer}>
                                        {token ? (
                                            <SearchBar handleBlur={handleBlur} handleFocus={handleFocus} inputIsFocused={inputIsFocused} />
                                        ) : (
                                            <TouchableOpacity style={styles.btnSignIn} onPress={handleSignIn}>
                                                <Text style={styles.btnSignInText}>Sign In</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </Animated.View>
                            </>
                        )}
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </AlertNotificationRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    animatedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        height: screenWidth / 2.88,
        width: screenWidth / 2.88,
    },
    btnSignIn: {
        width: screenWidth / 2,
        height: screenWidth / 7,
        backgroundColor: '#edede9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnSignInText: {
        fontSize: 20,
        textAlign: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logoutButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 10,
        borderRadius: 10,
        zIndex: 10, 
    }
});
