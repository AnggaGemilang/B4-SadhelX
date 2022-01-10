import React, { Component } from 'react';
import HeaderNavigation from '../HeaderNavigator';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import axios from 'axios'

export default class SuggestnAccept extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dataSuggest: [],
            dataRequest: [],
            isLoading: true, 
            page: 1, 
        };
    }

    fetchData = async () => {
        this.setState({
            isLoading: true,
        })
        try {
            const [respTodoOne, respTodoTwo] = await Promise.all([
                fetch("http://192.168.1.8:8080/api/follower/request/6"),
                fetch("http://192.168.1.8:8080/api/member/suggest/6")
            ]);
            const todoOne = await respTodoOne.json();
            const todoTwo = await respTodoTwo.json();
            this.setState({
                isLoading: false,
                dataRequest:todoOne.data,
                dataSuggest: todoTwo.data
            })
        } catch (err) {
            throw err;
        }
    }

    requestAPI = link => {
        let options = {}
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
    }

    postData = async (link, tipe) => {
        let response
        try {
            this.setState({
                isLoading: true,
            })
            if (tipe == 'accept'){
                response = await axios.put(link);
            } else {
                response = await axios.delete(link);
            }
            this.fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    footerList = () => {
        return (
            <View>
                <ActivityIndicator loading={this.state.isLoading} size={"large"} />
            </View>
        )
    }

    BottomFlatList = () => {
        return (
            <View>
                <Text style={styles.title2} >
                    Suggestion For You
                </Text>

                <FlatList
                    data={this.state.dataSuggest}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image source={{ uri: item.image_file }} style={styles.gambar} />
                            <Text style={styles.userName}>{item.firstname} {item.lastname}</Text>
                            <Text style={styles.name}>@{item.username}</Text>
                            <TouchableOpacity style={styles.bfollow}>
                                <Text style={styles.tfollow}>
                                    Follow
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity                        
                                onPress={() => this.fetchData() }>
                                <Image
                                    source={require('../../assets/icons/delete-64.png')}
                                    resizeMode='contain'
                                    style={styles.delete2}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    enableEmptySections={true}
                    style={{ marginTop: 35, flexGrow: 1, paddingBottom: 20 }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }

    render() {

        if (this.state.isLoading == true){
            return (
                <View style={styles.container}>
                    <Text style={styles.headerT}>Search</Text>
                    <HeaderNavigation />
                    <TouchableOpacity
                        style={styles.border}
                        onPress={() => this.props.navigation.navigate('FindFriends')}>
                        <Text style={styles.tsearch}>Search</Text>
                        <Image
                            source={require('../../assets/icons/searchA.png')}
                            resizeMode='contain'
                            style={styles.isearch}
                        />
                    </TouchableOpacity>

                    <View >
                        <ActivityIndicator style={{ marginTop: 150 }} size={"small"} />
                    </View>

                </View>   
            )
        } else {
            return (
                <ScrollView
                    style={styles.container} >
                    <Text style={styles.headerT}>Search</Text>
                    <HeaderNavigation />
                    <TouchableOpacity
                        style={styles.border}
                        onPress={() => this.props.navigation.navigate('FindFriends')}>
                        <Text style={styles.tsearch}>Search</Text>
                        <Image
                            source={require('../../assets/icons/searchA.png')}
                            resizeMode='contain'
                            style={styles.isearch}
                        />
                    </TouchableOpacity>

                    <Text style={styles.title} >
                        Follow Request
                    </Text>

                    <FlatList
                        data={this.state.dataRequest}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        onEndReached={this.handleLoadMore}
                        ListFooterComponent={this.BottomFlatList}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Image source={{ uri: item.image_file }} style={styles.gambar} />
                                <Text style={styles.userName}>{item.firstname} {item.lastname}</Text>
                                <Text style={styles.name}>@{item.username}</Text>
                                <TouchableOpacity style={styles.bfollow}
                                    onPress={ () =>
                                        this.postData('http://192.168.1.8:8080/api/follower/6'+ '/' + item.user_id, 'accept')
                                    } >
                                    <Text style={styles.tfollow}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={ () =>
                                        this.postData('http://192.168.1.8:8080/api/follower/6'+ '/' + item.user_id, 'deny')
                                    }>
                                    <Image
                                        source={require('../../assets/icons/delete-64.png')}
                                        resizeMode='contain'
                                        style={styles.delete}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        enableEmptySections={true}
                        style={{ marginTop: 130, flexGrow: 1 }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },

    border: {
        top: 110,
        paddingVertical: 7,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 20,
    },
    
    tsearch: {
        top: 3
    },

    isearch: {
        left: 275,
        width: 20
    },

    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 3,
        top: 130,
        marginHorizontal: 20,
    },

    title2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 3,
        top: 30,
        marginHorizontal: 20,
    },

    gambar: {
        top: 10,
        padding: 15,
        width: 50,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#000',
        marginHorizontal: 20,
    },

    userName: {
        color: 'black',
        padding: 5,
        top: 10,
        fontWeight: '500',
        left: 80
    },

    name: {
        left: 85,
        marginVertical: 8
    },

    bfollow: {
        backgroundColor: '#0C8EFF',
        paddingVertical: 5,
        alignItems: 'center',
        width: 70,
        borderRadius: 5,
        position: 'absolute',
        top: 20,
        right: 70
    },

    tfollow: {
        color: 'white'
    },

    delete: {
        position: 'absolute',
        right: 25,
        width: 20,
        bottom: -1,
    },

    delete2: {
        position: 'absolute',
        right: 25,
        width: 20,
        bottom: -1,
    },

    headerT: {
        fontSize: 30,
        color: 'black',
        position: 'absolute',
        left: 20,
        top: 25
    }
})