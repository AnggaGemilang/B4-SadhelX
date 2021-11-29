import axios from 'axios'
import React, { Component, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import HeaderDetail from '../components/headerDetail'
import Item from '../components/Item'
import SearchBar from '../components/searchBar'

const Detail = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const deleteItem = (item) => {
        console.log(item);
        axios.delete(`http://10.0.2.2:3004/users/${item.id}`)
            .then(res => {
                console.log('Delete :', res);
                getData();
            })
    }

    const getData = () => {
        axios.get('http://10.0.2.2:3004/users')
            .then(res => {
                console.log('Respons : ', res);
                setUsers(res.data);
                getData();
            })
    }

    return (
        <View style={styles.page}>
            <HeaderDetail />
            <SearchBar />
            <View style={{
                borderBottomWidth: 0.5, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 4
            }} />
            <ScrollView style={styles.list}>
                {users.map(user => {
                    return <Item
                        key={user.id}
                        judul={user.judul}
                        deskripsi={user.deskripsi}
                        keyword={user.keyword}
                        penulis={user.penulis}
                        onDelete={() => Alert.alert(
                            'Peringatan',
                            'Anda yakin ingin mennghapus data ini ?', [
                            { text: 'Tidak', onPress: () => console.log('Button Tidak') },
                            { text: 'Ya', onPress: () => deleteItem(user) }
                        ])} />
                })}
            </ScrollView>
        </View >
    )
}

export default Detail

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    list: {
        marginHorizontal: 20,
    }
})
