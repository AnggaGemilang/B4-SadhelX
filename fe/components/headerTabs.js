import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const HeaderTabs = () => {
    const [activeTab, setActiveTab] = useState("Tips Riding");
    return (
        <View style={styles.container}>
            <HeaderButton
                text="Tips Riding"
                btnColor='#0C8EFF'
                textColor="white"
                nav="CreateTips"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <HeaderButton
                text="Video Riding"
                btnColor='#DEDEDE'
                textColor="black"
                nav="CreateVideo"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <HeaderButton
                text="Docs Riding"
                btnColor='#DEDEDE'
                textColor="black"
                nav="CreateDocs"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </View>
    )
}

export default HeaderTabs

const HeaderButton = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={{
            backgroundColor: props.activeTab === props.text ? '#0C8EFF' : '#DEDEDE',
            marginLeft: 20,
            marginTop: 10,
            marginBottom: 11,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 5,
            fontFamily: 'Poppins-Light',
        }}
            onPress={() => navigation.navigate(props.nav) || props.setActiveTab(props.text)}
        >
            <Text style={{ color: props.activeTab === props.text ? "white" : 'black', fontSize: 12.5 }}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})
