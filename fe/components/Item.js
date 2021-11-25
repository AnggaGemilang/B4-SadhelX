import React, { useEffect, useState } from 'react'
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const Item = ({ judul, deskripsi, penulis, onPress, onDelete }) => {
    return (
        <ScrollView>
            <View style={styles.List}>
                <TouchableOpacity onPress={onPress}>
                    <View style={styles.Item}>
                        <Text style={styles.descJudul} numberOfLines={1}>{judul}</Text>
                        <Text style={styles.descDecs} numberOfLines={2}>{deskripsi}</Text>
                        <Text style={styles.descPenulis}>{penulis}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    )
}

export default Item;

const styles = StyleSheet.create({
    descPenulis: {
        color: "black",
        fontSize: 15,
        fontFamily: 'Poppins-Medium'
    },
    descJudul: {
        color: "black",
        fontSize: 20,
        weight: 100,
        fontWeight: 'bold',
        width: 240,
    },
    descDecs: {
        color: "black",
        fontSize: 16,
        weight: 100,
        fontFamily: 'Poppins-Light',
        width: 240,
    },
    Item: {
        flex: 1,
        backgroundColor: '#DBDBDB',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 25,
        borderRadius: 5,
        textAlign: 'center',
    },
    delete: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '989898',
        right: 12,
        backgroundColor: '#DBDBDB',
        paddingHorizontal: 31,
        paddingVertical: 50,
        borderRadius: 5,
    },
    List: {
        flexDirection: 'row',
        marginVertical: 10
    }
})

