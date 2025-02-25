import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Dimensions,
} from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import SearchBar from './Home/SearchBar'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function HomeScreen() {
    // Animated values
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const [inputIsFocused, setInputIsFocused] = useState(false);

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
                            style={[styles.logo, { opacity: logoOpacity }]}
                        />
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'end',
                            width: '100%',
                        }}>
                            <SearchBar handleBlur={handleBlur} handleFocus={handleFocus} inputIsFocused={inputIsFocused}/>
                            {/* <View style={{
                                position: "absolute",
                                bottom: -screenWidth / 7.2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}>
                            </View> */}
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
        marginBottom: spacing,
    },
    });
    