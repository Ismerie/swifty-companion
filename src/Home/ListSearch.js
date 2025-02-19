import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListSearch({listStudents}) {

    return (
        <View style={styles.container}>
            <FlatList
                data={listStudents}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image source={{ uri: item.image}} style={styles.image} />
                        <Text style={styles.login}>{item.login}</Text> 
                        <Text style={styles.firstName}>{item.firstName}</Text> 
                        <Text style={styles.lastName}>{item.lastName}</Text> 
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
        padding: 10,
    },
    card: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
});