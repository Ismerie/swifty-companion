import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ProgressBarAndroid } from 'react-native';
import { useStudent } from '../Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

export default function ProfileData() {
    const { student, colorCoalition } = useStudent();
    const [levelTrunc, setLevelTrunc] = useState(0);
    const [decimalPartLevel, setDecimalPartLevel] = useState(0);

        
    useEffect(() => {
        let totalLevel = 0
        if (student) {
            for (let i = 0; i < student.cursus_users.length; i++) {
                if (student.cursus_users[i].cursus_id === 21) {
                    totalLevel = student.cursus_users[i].level
                    break ;
                }
            }
            setLevelTrunc(Math.trunc(totalLevel) || 0); 
            setDecimalPartLevel(Math.trunc(((totalLevel - Math.trunc(totalLevel)) * 100)));
        }
    }, [student]);

    return (
        <>
            <View style={styles.container}>
                <Image 
                    source={student?.image?.versions?.medium 
                        ? { uri: student.image.versions.large}
                        : require('./../../assets/default_profile_picture.jpg')
                    } 
                    style={styles.image} 
                />
                <View style={styles.containerPersonalInfos}>
                    <Text style={styles.name}>{student.displayname}</Text>
                    <View style={styles.containerMail}>
                        <Icon name="mail-outline" size={18} color="#faedcd"/>
                        <Text style={styles.email}>{student.email}</Text>
                        
                    </View>
                </View>
            </View>
            <View style={styles.levelContainer}>
                <Text style={styles.level}>{levelTrunc}</Text>
                <View style={styles.levelProgressContainer}>
                    <View style={styles.containerInfosLevel}>
                        <Text style={styles.decimalLevel}>{decimalPartLevel}%</Text>
                        <View style={styles.location}>
                            <Icon name="location-outline" size={18} color="#faedcd"/>
                            <Text>{student?.campus?.[0]?.name || "Non renseigné"}</Text>
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[styles.progressBar, { width: `${decimalPartLevel}%`, backgroundColor: "#faedcd" }]} // Calcul de la largeur en fonction du niveau
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    containerPersonalInfos: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'start',
        paddingLeft: 10,
    },
    containerMail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        flex: 2,
        fontSize: 26,
        flexWrap: 'wrap',
    },
    email: {
        fontSize: 16,
        marginLeft: 5,
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    levelContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'end',
    },
    level: {
        fontSize: 34,
    },
    levelProgressContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 5,
    },
    decimalLevel: {
        fontSize: 14,
        textAlign: 'start',
        marginBottom: 5,
    },
    progressBarContainer: {
        height: 15,
        backgroundColor: '#333533',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 5,
    },
    containerInfosLevel: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
});
