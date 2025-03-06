import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useStudent } from '../Utils/studentContext';
import { screenHeight, screenWidth, apiClient } from '../Utils/constant';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProjectsList() {
    const { projects } = useStudent();
    const [projectDetails, setProjectDetails] = useState({});

    const fetchProjectDetails = async (projects) => {
        const details = {};
        for (const project of projects) {
            try {
                const res = await apiClient.get(`/projects/${project.project.id}`);
                if (res.status !== 200) throw new Error('Erreur API 42');
                
                details[project.project.id] = {
                    exam: res.data.exam,
                    solo: res.data.project_sessions?.[0]?.solo || false,
                };

                await new Promise(resolve => setTimeout(resolve, 500)); // Attendre 0.5s entre chaque requête
            } catch (error) {
                console.error(error);
                break ;
            }
        }
        setProjectDetails(details);
    };

    const getProjectIcon = (projectId) => {
        if (!projectDetails[projectId]) return "person-outline"; 
        if (projectDetails[projectId].exam) return "school-outline";
        if (projectDetails[projectId].solo) return "person-outline";
        return "people-outline";
    };

    const calculateElapsedTime = (apiDate) => {
        if (!apiDate) return "Date inconnue";
    
        let timeString = "";
        const givenDate = new Date(apiDate);
        const now = new Date();
    
        const diffInMs = now - givenDate;
        
        const calculateDiff = (timeUnit) => Math.floor(diffInMs / timeUnit);
        
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

    return (
        <View style={styles.container}>
        {projects.length > 0 ? (
            <FlatList
                data={projects}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Icon
                            name={getProjectIcon(item.project.id)}
                            size={34}
                            color="black"
                            style={styles.typeProject}
                        />
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameProject}>{item.project.name}</Text>
                            <Text style={styles.timeProject}>{calculateElapsedTime(item.marked_at)}</Text>
                        </View>
                        <View style={styles.markContainer}>
                            <Text style={styles.mark}>{item.final_mark}</Text>
                            {(item["validated?"] === false) ? (
                                <Icon name="close-outline" size={24} color="#9e2a2b" style={styles.iconMark}/>
                            ):(
                                <Icon name="checkmark-outline" size={24} color="#6a994e" style={styles.iconMark}/>
                            )}
                        </View>
                    </View>
                )}
            />
        ):(
            <Text style={styles.emptyProjects}>No projects yet</Text>
        )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: screenWidth * 0.04,
        paddingRight: screenWidth * 0.04,
        paddingTop: screenHeight * 0.015,
        paddingBottom: screenHeight * 0.015,
        marginBottom: screenHeight * 0.02,
        borderWidth: 2,
        borderColor: '#edede9',
        marginRight: 20, 
        marginLeft: 20,
        borderTopRightRadius: 10, 
        borderBottomStartRadius: 10,
        backgroundColor: '#edede9'
    },
    nameContainer: {
        flex: 1,
        justifyContent: 'start',
    },
    nameProject: {
        fontSize: 18,
        flexWrap: 'wrap',
        maxWidth: screenWidth * 0.6,
        marginBottom: screenHeight * 0.01,
    },
    mark: {
        fontSize: 20,
    },
    typeProject: {
        marginRight: screenWidth * 0.04,
    },
    markContainer: {
        flexDirection: 'row', 
        alignSelf: 'flex-end',
    },
    iconMark: {
        alignSelf: 'flex-end'
    },
    timeProject: {
    },
    emptyProjects: {
        textAlign: 'center',
        fontSize: 24,
        color: '#faedcd',
    }
});
