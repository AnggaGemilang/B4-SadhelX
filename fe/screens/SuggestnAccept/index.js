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
    ScrollView
} from 'react-native';

export default class SuggestnAccept extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoading: false, text: '', page: 1, };
        this.arrayholder = [];
    }

    componentDidMount() {
        const url = 'https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member?limit=5&page=1';
        return fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        isLoading: false,
                        data: responseJson,
                    }
                );
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleLoadMore = async () => {
        await this.setState(
            { page: this.state.page + 1, isLoading: true })
        const url = 'https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member?limit=5&page=' + this.state.page;
        return fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                this.setState(
                    {
                        data: this.state.data.concat(responseJson),
                        isLoading: false
                    }
                );
            }
            )
    }

    footerList = () => {
        return (
            <View>
                <ActivityIndicator loading={this.state.isLoading} size={"large"} />
            </View>
        )
    }

    // state = {
    //     toggle:true
    // }

    // Followed(){
    //     const newState = !this.state.toggle;
    //     this.setState({toggle:newState});

    //     const options = {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         method: 'POST',
    //         body: JSON.stringify({
    //             pengirim_id: 1,
    //             penerima_id: 2
    //         })  
    //     };

    //     fetch( 'http://192.168.1.9:8080/api/teman', options)
    //     .then( response => response.json() )
    //     .then( response => {
    //         console.log(response)
    //         if(response.is_private){
    //             this.setState({textValue:"Requested"})
    //         } else {
    //             this.setState({textValue:"Followed"})
    //         }
    //     })
    //     .catch( response => {
    //         this.state = true
    //         console.log(response)
    //     })
    // }

    render() {
        // const {toggle} = this.state;
        // const Teman = toggle?"Follow":this.state.textValue;
        // const TombolBg = toggle? "#16C79C":"#808080";
        return (

            <ScrollView
                style={styles.container}
            >
                <Text style={styles.headerT}>Search</Text>
                <HeaderNavigation />
                {/* <Text>PENCET PLOK</Text> */}
                <TouchableOpacity
                    style={styles.border}
                    onPress={() => this.props.navigation.navigate('FindFriends')}
                >
                    <Text style={styles.tsearch}>Search</Text>
                    <Image
                        source={require('../../assets/icons/searchA.png')}
                        resizeMode='contain'
                        style={styles.isearch}
                    />
                    {/* <Icon name="search" style={styles.isearch} size={30} color="#808080" /> */}
                </TouchableOpacity>

                <Text
                    style={styles.title}
                >
                    Follow Request
                </Text>

                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    onEndReached={this.handleLoadMore}
                    // ListFooterComponent={this.footerList}
                    renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Image source={{ uri: item.image_file }} style={styles.gambar} />
                                <Text style={styles.userName}>{item.username}</Text>
                                <Text style={styles.name}>@{item.firstname}</Text>
                                <TouchableOpacity style={styles.bfollow}>
                                    <Text style={styles.tfollow}>
                                        Follow
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
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

                <Text
                    style={styles.title}
                >
                    Suggestion For You
                </Text>

                <FlatList
                    data={this.state.data}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                    onEndReached={this.handleLoadMore}
                    // ListFooterComponent={this.footerList}
                    renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Image source={{ uri: item.image_file }} style={styles.gambar} />
                                <Text style={styles.userName}>{item.username}</Text>
                                <Text style={styles.name}>@{item.firstname}</Text>
                                <TouchableOpacity style={styles.bfollow}>
                                    <Text style={styles.tfollow}>
                                        Follow
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
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
        //position: 'relative',
        borderRadius: 5,
        borderWidth: 1,
        marginHorizontal: 20,
    },
    tsearch: {
        top: 3
    },
    isearch: {
        // position: 'absolute',
        // top: -5,
        left: 275,
        width: 20
        //height: 10
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        margin: 3,
        top: 130,
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
        //marginHorizontal: 5,
        //marginVertical: 5,
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
        //flexDirection: 'row',
        position: 'absolute',
        right: 25,
        //top: 0,
        width: 20,
        bottom: -1,
        // height:30,
    },
    headerT: {
        fontSize: 30,
        color: 'black',
        position: 'absolute',
        left: 20,
        top: 25
    }
    // follow: {
    //     width: 120,
    //     height: 30,
    //     // height:29,
    //     // top: 150,
    //     // bottom: 592,
    //     backgroundColor: TombolBgg,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingVertical: 5,
    //     marginHorizontal: 5,
    //     borderRadius: 10,
    //     elevation: 5, 
    // }    
})