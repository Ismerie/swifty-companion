import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';

import { screenHeight, screenWidth, apiClient } from '../Utils/constant';
import { useStudent } from '../Utils/studentContext';

export default function SkillsList() {
    const { student, colorCoalition, skills } = useStudent();
    const levelMax = useRef(0)
    const colorCard = useRef(colorCoalition.transparence);
    
    const PercentageSizeLevel = (level, levelMax) => {
        let result = 0;

        level = Math.trunc(level) || 0; 
        result = (level * 100) / levelMax;
        return result;
    }

    const getDarkerColor = (hexColor, level, maxLevel) => {
        // Calcul du pourcentage d'assombrissement (plus le niveau est haut, plus on assombrit)
        const darkenAmount = Math.floor((+40 * level) / maxLevel); // Ajuste l'intensité de l'effet
    
        const lightenDarkenColor = (col, amt) => {
            let usePound = false;
            if (col[0] === "#") {
                col = col.slice(1);
                usePound = true;
            }
    
            let num = parseInt(col, 16);
            let r = (num >> 16) + amt;
            let g = ((num >> 8) & 0x00ff) + amt;
            let b = (num & 0x0000ff) + amt;
    
            r = Math.min(255, Math.max(0, r));
            g = Math.min(255, Math.max(0, g));
            b = Math.min(255, Math.max(0, b));
    
            return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };
    
        return lightenDarkenColor(hexColor, darkenAmount);
    };
    
    
    useEffect(() => {
            if (student) {
                if (skills.length > 0)
                    levelMax.current = Math.trunc(skills[0].level)
            }
    }, [student]);

    return (
        <View style={styles.container}>
        {skills.length > 0 ? (
            <FlatList
                data={skills}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    
                    <View style={styles.levelProgressContainer}>
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBar,
                                    { 
                                        width: `${PercentageSizeLevel(item.level, levelMax.current)}%`, 
                                        backgroundColor: getDarkerColor("#faedcd", item.level, levelMax.current) 
                                    }
                                ]}
                            >
                                <View style={styles.infosSkill}>
                                    <View style={styles.containerNameAndLevel}>
                                        <Text style={styles.decimalPart}>{Math.trunc(((item.level - Math.trunc(item.level)) * 100))}%</Text>
                                        <Text style={styles.nameSkill}>{item.name}</Text>
                                        <Text style={styles.level}>{Math.trunc(item.level)}</Text>
                                    </View>
                                    <View style={styles.containerPoucentageAndBar}>
                                        <View 
                                            style={[
                                                styles.containerDecimalBar,
                                                { 
                                                    width: `${Math.trunc(((item.level - Math.trunc(item.level)) * 100))}%`,
                                                    backgroundColor: getDarkerColor("#46494c", item.level, levelMax.current)
                                                }
                                            ]}>
                                        </View>
                                        {/* <Text>{Math.trunc(((item.level - Math.trunc(item.level)) * 100))}%</Text> */}
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                )}
            />
        ):(
            <Text style={styles.emptySkills}>No skills yet</Text>
        )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    level: {
        fontSize: 26,
    },
    levelProgressContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 5,
        marginBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    progressBarContainer: {
        minHeight: 48,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    progressBar: {
        minHeight: 48,
        paddingTop: 5,
        backgroundColor: '#274c77',
        borderEndEndRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
    },
    nameSkill: {
        flexWrap: 'wrap',
        fontSize: 16,
        flex: 2,
        textAlign: 'center',
        paddingHorizontal: 5,
        numberOfLines: 2, 
    },
    emptySkills: {
        textAlign: 'center',
        fontSize: 24,
        color: '#faedcd'
    },
    containerNameAndLevel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'center',
        alignSelf: 'center'
    },
    containerDecimalBar: {
        minHeight: 5,
        maxHeight: 5,
        backgroundColor: '#bb9457',
        borderEndEndRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerPoucentageAndBar: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
    },
    decimalPart: {
        fontSize: 14,
        color: '#46494c'
    }
});