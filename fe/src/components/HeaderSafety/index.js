import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconBell, IconManage, IconPesan } from '../../assets'
import { useNavigation } from '@react-navigation/native';

const HeaderSafety = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.titleheader}>Safety</Text>
                <View style={{ flexDirection: 'row', left: 100 }}>
                    <TouchableOpacity style={styles.buttontab}>
                        <IconManage onPress={() => navigation.navigate('Detail')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttontab}>
                        <IconBell />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttontab}>
                        <IconPesan />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default HeaderSafety

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleheader: {
        flexDirection: 'row',
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 40,
        paddingTop: 30,
    },
    buttontab: {
        marginHorizontal: 4,
        paddingTop: 37,
    },
})