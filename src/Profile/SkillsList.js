import React, { useEffect, useState } from 'react';
import { StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    StatusBar,
    FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { screenHeight, screenWidth, apiClient } from '../Utils/constant';
import { useStudent } from '../Utils/studentContext';

export default function SkillsList() {
    const { student } = useStudent();
    const [loading, setLoading] = useState(true);
    const [skills, setSkills] = useState([])

    useEffect(() => {
            if (student) {
                setLoading(false);
                const skills = student.cursus_users[1].skills;
                setSkills(skills); 
                console.log(student.cursus_users[1].skills[0].name)
                
            }
    }, [student]);

    return (
        <View style={styles.container}>
            <FlatList
                data={skills}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});