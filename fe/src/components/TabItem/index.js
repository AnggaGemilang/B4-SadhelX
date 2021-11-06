import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WARNA_UTAMA } from '../../utils/constants'
import {
    IconFeed,
    IconSearch,
    IconToolbar,
    IconSafety,
    IconProfil,
    IconProfilActive,
    IconSafetyActive,
    IconSearchActive,
    IconFeedActive
} from '../../assets'

const TabItem = ({ label, isFocused, onLongPress, onPress }) => {

    const Icon = () => {
        if (label === "Feed") {
            return isFocused ? <IconFeedActive /> : <IconFeed />;
        }

        if (label === "Search") {
            return isFocused ? <IconSearchActive /> : <IconSearch />;
        }

        if (label === " ") {
            return <IconToolbar />;
        }

        if (label === "Safety") {
            return isFocused ? <IconSafetyActive /> : <IconSafety />;
        }

        if (label === "Profil") {
            return isFocused ? <IconProfilActive /> : <IconProfil />;
        }

    };
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Icon />
            <Text style={styles.text}>
                {label}
            </Text>
        </TouchableOpacity >
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        color: WARNA_UTAMA,
        fontFamily: 'Poppins-Medium',
    },
})