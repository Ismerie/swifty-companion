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
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import SearchBar from './Home/SearchBar'
import { screenHeight, screenWidth } from './Utils/constant';
import {signInWith42} from './Utils/getAccessToken';

export default function HomeScreen() {
    // Animated values
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const handleSignIn = () => {
        signInWith42();
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
        
    return (
        <AlertNotificationRoot>        
            <ImageBackground
                source={require('../assets/background42.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <TouchableWithoutFeedback onPress={handleBlur} accessible={false}>
                    <SafeAreaView style={styles.container}>
                        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }]}]}>
                            <Animated.Image 
                                source={require('../assets/42logo.png')}
                                style={[styles.logo, { opacity: logoOpacity, display: inputIsFocused ? 'none' : 'flex' }]}
                            />
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'end',
                                width: '100%',
                            }}>
                                <TouchableOpacity 
                                    onPress={() => handleSignIn()}
                                >
                                    <Text>Sign In</Text>
                                </TouchableOpacity>
                                <SearchBar handleBlur={handleBlur} handleFocus={handleFocus} inputIsFocused={inputIsFocused}/>
                            </View>
                        </Animated.View>
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
    });
