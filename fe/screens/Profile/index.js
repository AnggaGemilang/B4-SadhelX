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

                <View style={styles.container1}>

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
                                fontSize: 18
                            }} >
                            129
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
                                    fontSize: 18
                                }} >
                                129
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18
                                }}
                            >
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
                                    fontSize: 18
                                }} >
                                129
                            </Text>
                            <Text
                                style={{
                                    fontSize: 18
                                }}
                            >
                                Following
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>









                
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 45,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  container1: {
    flex: 1,
    color: 'black',
    alignItems: 'center',
    paddingTop: 45,
    marginHorizontal: 25,
    alignContent: 'center',
    justifyContent: "space-between",
    flexDirection: "row",
  }
});
