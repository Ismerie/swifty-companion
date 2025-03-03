import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ProgressBarAndroid } from 'react-native';
import { useStudent } from '../Utils/studentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

export default function ProfileData() {
    const { student, colorCoalition } = useStudent();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (student) {
            setLoading(false);
        }
    }, [student]);

    if (loading) {
        return <Text>Chargement des données...</Text>;
    }

    const totalLevel = student?.cursus_users?.[1]?.level || 0
    const levelTrunc = Math.trunc(totalLevel) || 0; 
    const decimalPartLevel = Math.trunc(((totalLevel - levelTrunc) * 100));

    return (
        <>
            <View style={styles.container}>
                <Image 
                    source={student.image?.versions?.medium 
                        ? { uri: student.image.versions.large}
                        : require('./../../assets/default_profile_picture.jpg')
                    } 
                    style={styles.image} 
                />
                <View style={styles.containerPersonalInfos}>
                    <TextInput style={styles.name}>{student.displayname}</TextInput>
                    <View style={styles.containerMail}>
                        <Icon name="mail-outline" size={18} color={colorCoalition.color}/>
                        <TextInput style={styles.email}>{student.email}</TextInput>
                        
                    </View>
                </View>
            </View>
            <View style={styles.levelContainer}>
                <Text style={styles.level}>{levelTrunc}</Text>
                <View style={styles.levelProgressContainer}>
                    <View style={styles.containerInfosLevel}>
                        <Text style={styles.decimalLevel}>{decimalPartLevel}%</Text>
                        <View style={styles.location}>
                            <Icon name="location-outline" size={18} color={colorCoalition.color}/>
                            <Text>{student?.campus?.[0]?.name || "Non renseigné"}</Text>
                        </View>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[styles.progressBar, { width: `${decimalPartLevel}%`, backgroundColor: `${colorCoalition.color}` }]} // Calcul de la largeur en fonction du niveau
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
