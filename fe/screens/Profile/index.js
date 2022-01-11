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
            <View style={styles.container}>
                <View style={styles.row}>
                    <View>
                        <Image
                            source={require('../../assets/icons/pp.png')}
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100,
                                borderWidth: 1.5,
                                borderColor: '#000',
                            }}
                        />
                    </View>
                    <View >
                        <Text
                            style={{
                                    textAlign: 'center', 
                                    fontSize: 18,
                                    fontWeight: "bold"
                            }} >
                            30
                        </Text>
                        <Text
                            style={{
                                fontSize: 18
                            }} >
                            Post
                        </Text>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Followers')}>
                            <Text
                                style={{
                                    textAlign: 'center', 
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }} >
                                420
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18
                                }} >
                            Follower
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Following')}>
                            <Text
                                style={{
                                    textAlign: 'center', 
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }} >
                                400
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18
                                }} >
                                Following
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 10}} >Pitri Parker</Text>
                </View>
                <View style={styles.row}>
                    <Text style={{fontSize: 15, marginBottom: 18}}>Personal Blog</Text>
                </View>
                <View style={styles.row}>
                    {/* Follow */}
                    <TouchableOpacity
                        style={{
                            width: '31%',
                            height: 30,
                            alignSelf: 'stretch',
                            backgroundColor: TombolBg,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            elevation: 5
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
                                                this.requestAPI('http://192.168.1.8:8080/api/following/2/1')
                                            },
                                        },
                                        {
                                            text: "No",
                                        },
                                    ]
                                );
                            }
                        }} >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }} >
                            {Teman}
                        </Text>
                    </TouchableOpacity>

                    {/* Activity */}
                    <TouchableOpacity
                        style={styles.baten} >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'
                            }} >
                            Activity
                        </Text>
                    </TouchableOpacity>

                    {/* Menus */}
                    <TouchableOpacity
                        style={styles.baten} >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: 'bold'

                            }} >
                            Menus
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        justifyContent: "center",
        color: 'black'
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 25,
        alignContent: 'center',
        justifyContent: "space-between",
    },
    baten: {
        width: '31%',
        height: 30,
        alignSelf: 'stretch',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    }
});
