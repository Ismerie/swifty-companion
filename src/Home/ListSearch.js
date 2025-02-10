import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

import students from '../../students.json';

export default function ListSearch() {
    const [inputText, setInputText] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(students);

    function handleSearch(text) {
        setInputText(text);
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStudents(filtered);
    }

    function handleSearchSubmit() {
        // Gérer la soumission de la recherche
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                data={filteredStudents}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: item.photo }} style={styles.photo} />
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        width: 300,
        borderRadius: 10,
    },
});