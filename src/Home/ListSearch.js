import React, { useState, useEffect } from 'react';
import { StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStudent } from '../Utils/studentContext';
import { apiClient, screenHeight } from '../Utils/constant';

export default function ListSearch({listStudents, lengthSearch}) {
    const { setStudent, setColorCoalition } = useStudent();
    const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(true);
    

    function addTransparencyToHex(hex, alpha) {
            hex = hex.replace(/^#/, '');
        
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
        
            if (hex.length !== 6) {
                console.warn("Format hex invalide :", hex);
                return "#FFFFFF33"; // Blanc avec 20% d'opacité par défaut
            }
        
            // Convertit alpha (0-1) en valeur hexadécimale
            let alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
        
            return `#${hex}${alphaHex}`;
        }
        

    const handleSelectStudent = async (id) => {
        try {
            const res = await apiClient.get(`/users/${id}`);
            if (res.status != "200") throw new Error('Error API 42');
            if (res.data) {
                setStudent(res.data)
            }
        }
        catch (error) {
            console.log(error)
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Error connecting to API 42. Retry later.',
            });
            return ;
            
        }
        try {
            const res = await apiClient.get(`/users/${id}/coalitions`);
            if (res.status !== 200) throw new Error('Error API 42');
            if (res.data) {
                console.log(res.data[0]);
                setColorCoalition({
                    tranparence: addTransparencyToHex(res.data[0].color, 0.2),
                    color: res.data[0].color
                })
                
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Error connecting to API 42. Retry later.',
            });
            return ;
        }
        navigation.navigate('ProfileScreen');
    }

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
                keyboardShouldPersistTaps="handled" 
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}
                        onPress={() => {
                            handleSelectStudent(item.id);
                        }}>
                    {item.image != null ? (
                        <Image source={{ uri: item.image}} style={styles.image} />
                    ):(
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
		maxHeight: screenHeight / 3,
    },
    containerList: {
        position: "absolute",
        maxHeight: screenHeight / 3,
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