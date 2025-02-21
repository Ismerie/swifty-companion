import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function ListSearch({listStudents, lengthSearch}) {

    console.log(listStudents)
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.containerList}
                data={listStudents}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
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
        backgroundColor: "white",
        width: 300,
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingBottom: 10,
    },
    containerList: {

    },
    card: {
        flex: 1,
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