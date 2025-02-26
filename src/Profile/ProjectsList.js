import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useStudent } from '../Utils/studentContext';

export default function ProjectsList() {
    const { student } = useStudent();
    const [loading, setLoading] = useState(true);
    const [filteredProjects, setFilteredProjects] = useState([]);

    const calculateElapsedTime = (apiDate) => {
        if (!apiDate) return "Date inconnue";
        let timeString = "";
        const givenDate = new Date(apiDate);
        const now = new Date();
    
        // en millisecondes
        const diffInMs = now - givenDate;
    
        // Fonction de calcul de la différence
        const calculateDiff = (timeUnit) => Math.floor(diffInMs / timeUnit);
    
        // en millisecondes, minutes, heures, jours, mois, années
        const diffInMinutes = calculateDiff(1000 * 60);
        const diffInHours = calculateDiff(1000 * 60 * 60);
        const diffInDays = calculateDiff(1000 * 60 * 60 * 24);
        const diffInMonths = calculateDiff(1000 * 60 * 60 * 24 * 30);
        const diffInYears = calculateDiff(1000 * 60 * 60 * 24 * 30 * 12);

        switch (true) {
            case (diffInYears >= 1):
                timeString = diffInYears === 1 ? "1 year" : `${diffInYears} years`;
                break;
            case (diffInMonths >= 1):
                timeString = diffInMonths === 1 ? "1 month" : `${diffInMonths} months`;
                break;
            case (diffInDays >= 1):
                timeString = diffInDays === 1 ? "1 day" : `${diffInDays} days`;
                break;
            case (diffInHours >= 1):
                timeString = diffInHours === 1 ? "1 hour" : `${diffInHours} hours`;
                break;
            case (diffInMinutes >= 1):
                timeString = diffInMinutes === 1 ? "1 minute" : `${diffInMinutes} minutes`;
                break;    
            default:
                return "then less 1 minute ago";
        }
    
        return `about ${timeString} ago`;
    };
    
    
    useEffect(() => {
        if (student) {
            setLoading(false);
            console.log(student.projects_users[0]);
            const filtered = student.projects_users.filter(item => item.marked === true && item.cursus_ids[0] === 21);
            setFilteredProjects(filtered);
            console.log(filtered);
            console.log(filtered[0]);
        }
    }, [student]);

    if (loading) {
        return <Text>Chargement des données...</Text>;
    }

    return (
        <View>
            <FlatList
                data={filteredProjects}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.project.name}</Text>
                        <Text>{item.final_mark}</Text>
                        <Text>{calculateElapsedTime(item.marked_at)}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
