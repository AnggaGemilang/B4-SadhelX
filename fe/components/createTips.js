import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const CreateTips = () => {

    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [keyword, setKeyword] = useState("");
    const [penulis, setPenulis] = useState("");

    const submit = () => {
        const data = {
            judul,
            deskripsi,
            keyword,
            penulis,
        }
        axios.post('http://10.0.2.2:3004/users', data)
            .then(res => {
                console.log('Respons : ', res)
                setJudul("");
                setDeskripsi("");
                setKeyword("");
                setPenulis("");
                getData();
                navigation.navigate('Detail')
            });
    }

    const getData = () => {
        axios.get('http://10.0.2.2:3004/users')
            .then(res => {
                console.log('Respons : ', res);
                setUsers(res.data);
            })
    }

    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.text}>Judul</Text>
            <TextInput placeholder="Masukan Judul" style={styles.textInput} value={judul} onChangeText={(value) => setJudul(value)} />
            <Text style={styles.text}>Deskripsi</Text>
            <TextInput placeholder="Masukan Deskripsi" style={styles.textDesc} value={deskripsi} onChangeText={(value) => setDeskripsi(value)} multiline={true} numberOfLines={5} />
            <Text style={styles.text}>Keyword</Text>
            <TextInput placeholder="Masukan Keyword" style={styles.textInput} value={keyword} onChangeText={(value) => setKeyword(value)} />
            <Text style={styles.text}>Penulis</Text>
            <TextInput placeholder="Masukan Penulis" style={styles.textInput} value={penulis} onChangeText={(value) => setPenulis(value)} />
            <TouchableOpacity onPress={submit}>
                <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default CreateTips

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    textInput: {
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: '#E5E5E5',
    },
    textDesc: {
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: '#E5E5E5',
        textAlignVertical: 'top',
    },
    text: {
        color: 'black',
        fontFamily: 'Poppins-Light'
    },
    submit: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        paddingVertical: 5,
        width: 100,
        backgroundColor: '#0C8EFF',
        textAlign: 'center',
        borderRadius: 5,
        marginHorizontal: 115,
        marginBottom: 70,
        marginTop: 20,
    }
})
