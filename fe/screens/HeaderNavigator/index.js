import React, { useState } from "react"
import { View, Text, TouchableOpacity } from 'react-native'

export default function HeaderNavigator() {
    const [activeTab, setActiveTab] = useState("Friends");
    return (
        <View style={{

            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
            top: 90

        }}>
            <HeaderButton

                text="Friends"
                btnColor="#0C8EFF"
                textColor="#FFF"
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
            <HeaderButton
                text="Forum"
                btnColor="#FFF"
                textColor="#0C8EFF"
                activeTab={activeTab}
                setActiveTab={setActiveTab} />

            <HeaderButton
                text="Event"
                btnColor="#FFF"
                textColor="#0C8EFF"
                activeTab={activeTab}
                setActiveTab={setActiveTab} />

            <HeaderButton
                text="Market"
                btnColor="#FFF"
                textColor="#0C8EFF"
                activeTab={activeTab}
                setActiveTab={setActiveTab} />
        </View>
    )
}

const HeaderButton = (props) => (
    <TouchableOpacity style={{
        backgroundColor: props.activeTab === props.text ? '#0C8EFF' : '#F0F2F5',
        paddingVertical: 5,
        paddingHorizontal: 18,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
    }}
    onPress={() => props.setActiveTab(props.text)} >
        <Text style={{ color: props.activeTab === props.text ? '#FFF' : '#757575' }}>{props.text}</Text>
    </TouchableOpacity>
);