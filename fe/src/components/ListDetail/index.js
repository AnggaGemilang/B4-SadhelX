import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { IconDel, Tumbnail } from '../../assets'
import { useNavigation } from '@react-navigation/native';

const ListDetail = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
                <View style={styles.box} >
                    <View style={{ flexDirection: 'row', fontFamily: 'Poppins-Light' }} >
                        <Image style={{ borderRadius: 10, left: 40 }} source={Tumbnail} />
                        <Text style={{ paddingRight: 60, left: 60, fontFamily: 'Poppins-Bold', fontSize: 20 }}>Judul Aja</Text>
                        <Text style={{ left: -99, top: 30, fontSize: 15 }}> Jenisnya</Text>
                    </View>
                </View >
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.del}>
                    <IconDel />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ListDetail

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#EAEAEA',
        borderRadius: 20,
        marginHorizontal: 40,
        marginTop: 20,
        paddingVertical: 20,
        right: 20
    },
    del: {
        left: -55,
        top: 10,
        backgroundColor: '#EAEAEA',
        paddingHorizontal: 20,
        paddingVertical: 35,
        borderRadius: 15
    }
})