import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import HeaderDetailAdmin from '../../components/HeaderDetailAdmin'
import ListDetail from '../../components/ListDetail'
import SearchBar from '../../components/SearchBar'

const Detail = () => {
    return (
        <View style={styles.page}>
            <HeaderDetailAdmin />
            <SearchBar />
            <ScrollView>
                <ListDetail />
                <ListDetail />
                <ListDetail />
                <ListDetail />
                <ListDetail />
                <ListDetail />
                <ListDetail />
            </ScrollView>
        </View >
    )
}

export default Detail

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
})