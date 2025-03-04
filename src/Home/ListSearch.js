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

import request from '../Utils/request';

export default function ListSearch({listStudents, lengthSearch, setLoading}) {
    const { setStudent, setColorCoalition, setProjects, setSkills } = useStudent();
    const navigation = useNavigation();
    const [isKeyboardVisible, setKeyboardVisible] = useState(true);        

        const handleSelectStudent = async (id) => {
            setLoading(true);
            console.log(id)
            navigation.navigate('ProfileScreen', { studentId: id });

            // try {
            //     const dataProfileStudent = await request.getProfileStudent(id); // Attendre la réponse
        
            //     if (dataProfileStudent.success) {
            //         setStudent(dataProfileStudent.data);
            //     } 
            //     else 
            //         throw new Error('Error API 42')

            //     const filteredProjects = dataProfileStudent.data.projects_users.filter(
            //         item => item.marked === true && item.cursus_ids[0] === 21
            //     );
            //     setProjects(filteredProjects);

            //     for (let i = 0; i < dataProfileStudent.data.cursus_users.length; i++) {
            //         if (dataProfileStudent.data.cursus_users[i].cursus_id === 21) {
            //             setSkills(dataProfileStudent.data.cursus_users[i].skills);
            //             break
            //         }
            //         else if (i + 1 === dataProfileStudent.data.cursus_users.length) {
            //             setSkills([]);
            //         }
            //     }

            //     const dataColor = await request.getColorCoalitionStudent(id); // Attendre la réponse
            //     if (dataColor.success && dataColor.data) {
            //         setColorCoalition({
            //             transparence: addTransparencyToHex(dataColor.data, 0.2),
            //             color: dataColor.data
            //         });
            //     } 
            //     else if (dataColor.success) {
            //         setColorCoalition({
            //             transparence: "#FFFFFF33",
            //             color: "#FFFFFF"
            //         });
            //     }
            //     else
            //         throw new Error('Error API 42')
        
            //     navigation.navigate('ProfileScreen');
            // } catch (error) {
            //     console.error("Error in handleSelectStudent:", error);
            //     Toast.show({
            //         type: ALERT_TYPE.DANGER,
            //         title: 'Error',
            //         textBody: 'An unexpected error occurred. Please try again later.',
            //     });
            //}
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