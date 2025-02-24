import React, { useState, useRef, useEffect } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
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
	Text,
    Dimensions,
} from 'react-native';

import SearchBar from './Home/SearchBar'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const spacing = screenWidth / 12

export default function HomeScreen() {
    // Animated values
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    return (
        <>
            <ImageBackground
                source={require('../assets/background42.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.container}>
                        <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }]}]}>
                        <Animated.Image 
                            source={require('../assets/42logo.png')}
                            style={[styles.logo, { opacity: logoOpacity }]}
                        />
                        <View style={{
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <SearchBar  logoOpacity={logoOpacity} inputPosition={translateY}/>
                            <View style={{
                                position: "absolute",
                                bottom: -screenWidth / 7.2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}>
                            </View>
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
    }
    
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#0003",
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
    