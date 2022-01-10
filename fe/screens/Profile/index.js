import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert,
    Image
} from 'react-native'

export default class Member extends Component {

    constructor (props) {
        super(props);

        this.state = {
            toggle: false
        }
    }

    requestAPI = link => {

        let options = {}

        if(!this.state.toggle){
            options = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    pengirim_id: 1,
                    penerima_id: 2
                })
            };

            fetch(link, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.is_private) {
                    this.setState({ 
                        textValue: "Requested",
                        toggle: true
                     })
                } else {
                    this.setState({ 
                        textValue: "Followed",
                        toggle: true
                     })
                }
            })
            .catch(response => {
                this.state = true
                console.log(response)
            })
        } else {
            options = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            };

            fetch(link, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (response.is_private) {
                    this.setState({ 
                        textValue: "Requested",
                        toggle: false
                     })
                } else {
                    this.setState({ 
                        textValue: "Followed",
                        toggle: false
                     })
                }
            })
            .catch(response => {
                this.state = true
                console.log(response)
            })
        }
    }

    render() {

        const { toggle } = this.state;
        const Teman = toggle ? this.state.textValue : "Follow";
        const TombolBg = toggle ? "#808080" : "#16C79C";

        const { navigate } = this.props.navigation;

        return (
            <View>

                {/* Status atas */}

                <View
                    style={{
                        position: 'absolute',
                        paddingVertical: 150,
                        left: 180,
                        flex: 1,

                    }}
                >
                    <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('Followers')}
                    >
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >
                            Polower
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        position: 'absolute',
                        paddingVertical: 150,
                        left: 300,
                        flex: 1,

                    }}
                >
                    <TouchableOpacity

                        onPress={() => this.props.navigation.navigate('Following')}
                    >
                        <Text
                            style={{
                                fontSize: 20
                            }}
                        >
                            Polowing
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* PP */}

                <View
                    style={{
                        position: 'absolute',
                        marginVertical: 100,
                        marginLeft: 20,
                        flex: 1,

                    }}
                >
                    <Image
                        source={require('../../assets/icons/pp.png')}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 100,
                            borderWidth: 1.5,
                            borderColor: '#000',
                            top: 5
                        }}
                    />
                </View>

                {/* nick */}
                <View
                    style={{
                        position: 'absolute',
                        marginHorizontal: 30,
                        marginVertical: 250,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '900',
                            fontSize: 20
                        }}
                    >
                        Pitri Parker
                    </Text>
                </View>

                {/* KET */}
                <View
                    style={{
                        position: 'absolute',
                        marginHorizontal: 30,
                        marginVertical: 280,
                        flex: 1,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15
                        }}
                    >
                        Biodata
                    </Text>
                </View>

                {/* Tombol */}
                <View
                    style={{
                        marginHorizontal: 15,
                        position: 'absolute',
                        flexDirection: 'row',
                        marginVertical: 350,
                        flex: 1,

                    }}
                >

                    {/* Follow */}
                    <TouchableOpacity

                        style={{
                            width: 120,
                            height: 30,
                            backgroundColor: TombolBg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            borderRadius: 10,
                            elevation: 5,
                        }}
                        onPress={() => {
                            if (!this.state.toggle){
                                this.requestAPI('http://192.168.1.8:8080/api/following')
                            } else {
                                return Alert.alert(
                                    "Are your sure?",
                                    "You can't follow him/her anymore",
                                    [
                                        {
                                            text: "Yes",
                                            onPress: () => {
                                                console.log("asdasdasd")
                                                this.requestAPI('http://192.168.1.8:8080/api/following/2/1')
                                            },
                                        },
                                        {
                                            text: "No",
                                        },
                                    ]
                                );
                            }
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }}
                        >
                            {Teman}
                        </Text>
                    </TouchableOpacity>

                    {/* Activity */}
                    <TouchableOpacity
                        style={{
                            width: 120,
                            // height:29,
                            // top: 120,
                            // bottom: 592,
                            // left: 110,
                            // right:592,
                            backgroundColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            borderRadius: 10,
                            elevation: 5
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }}
                        >
                            Activity
                        </Text>
                    </TouchableOpacity>

                    {/* Menus */}
                    <TouchableOpacity
                        style={{
                            width: 120,
                            backgroundColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            marginHorizontal: 5,
                            borderRadius: 10,
                            elevation: 5
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }}
                        >
                            Menus
                        </Text>
                    </TouchableOpacity>

                    {/* dll */}
                    <TouchableOpacity
                        style={{
                            width: 32,
                            backgroundColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 5,
                            marginHorizontal: 15,
                            borderRadius: 10,
                            elevation: 5
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }}
                        >
                            V
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke'
    }
})
