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

import SearchBar from './Home/SearchBar'

export default function HomeScreen() {
    // Animated values
    const logoOpacity = useRef(new Animated.Value(1)).current;
    const inputPosition = useRef(new Animated.Value(0)).current;

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
                            <SearchBar logoOpacity={logoOpacity} inputPosition={inputPosition} />
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
    backgroundImage: {
        flex: 1,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});