import React from 'react'
import { StyleSheet, View } from 'react-native'
import TabItem from '../TabItem';

const BottomTabNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabItem
                        key={index}
                        isFocused={isFocused}
                        label={label}
                        onlongPress={onLongPress}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: 'flex-end',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.57,
        shadowRadius: 15.19,

        elevation: 23,
    }
})