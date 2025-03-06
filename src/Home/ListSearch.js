import React, { useState, useEffect } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStudent } from '../Utils/studentContext';
import { apiClient, screenHeight } from '../Utils/constant';

import request from '../Utils/request';

export default function ListSearch({listStudents, lengthSearch}) {
    const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(true);        

        const handleSelectStudent = async (id) => {
            navigation.navigate('ProfileScreen', { studentId: id });
        };
        

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
                keyboardShouldPersistTaps="handled" // Assure que le scroll fonctionne même quand le clavier est affiché
                onStartShouldSetResponder={() => false} // Désactive la capture du toucher au début pour éviter les conflits
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.card}
                        activeOpacity={0.7} 
                        onPress={() => handleSelectStudent(item.id)}
                    >
                        {item.image != null ? (
                            <Image source={{ uri: item.image }} style={styles.image} />
                        ) : (
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
    },
    containerList: {
        position: "absolute",
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