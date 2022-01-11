import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios'
import { insertNewRecent, deleteRecentData, queryRecentLists } from '../../databases/index'

export default class FindFriends extends Component {

  constructor (props) {
    super(props);

    this.state = {
        isLoading: false,
        page: 1,
        jumlahPage: 0,
        jumlahData: 0,
        text: "",        
        dataSource: [],
        isRecent: true,
        isEmpty: false
    };
  }

  loadDataRecent = () => {
    queryRecentLists().then((recentLists) => {
      if (recentLists == undefined) {
        this.setState({
          dataSource: recentLists, 
          isLoading: false,
          page: -1,
          jumlahPage: -1,
          isRecent: true,
        });
      } else {
        this.setState({
          dataSource: recentLists,
          isLoading: false,
          page: -1,
          jumlahPage: -1,
          isRecent: true,
        })
      }
    }).catch((error) => {
      this.setState({ isLoading: false, dataSource: [] });
    })
  }

  componentDidMount () {
    this.loadDataRecent()
  }

  makeRequest = async (text) => {
    try {
      let response
      if(text != "") {
        response = await axios.get(`http://192.168.1.8:8080/api/member/cari/6/${text}?limit=8&page=${this.state.page}`);
        if(this.state.page == 1) {
          this.setState({
            isLoading: false,
            jumlahData: response.data.total_jml_data,
            dataSource: response.data.data,
            isRecent: false,
            jumlahPage: Math.ceil(response.data.total_jml_data / response.data.limit)
          })
        } else {
          this.setState({
            isLoading: false,
            jumlahData: response.data.total_jml_data,
            dataSource: this.state.dataSource.concat(response.data.data)
          })
        }
      } else {
        this.loadDataRecent()
      }
    } catch (error) {
      if (error.response.status == 404){
        this.setState({
          isEmpty: true
        })
      }
    }
  }

  renderItem = ({ item }) => {
    if (this.state.isRecent) {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("Dipencet")
          }}>
          <TouchableOpacity>
            <Image source={{ uri: item.image_file }} style={styles.gambar} />
              <Text style={styles.userName}>{item.firstname} {item.lastname}</Text>
              <Text style={styles.name}>@{item.username}</Text>
              <TouchableOpacity
                onPress={() => {
                  deleteRecentData(item.id).then().catch(error => {
                    alert(`Failed to delete recentItem with id = ${id}, error=${error}`);
                  });
                  this.loadDataRecent()
              }} >
              <Image
                source={require('../../assets/icons/delete-64.png')}
                resizeMode='contain'
                style={styles.delete}
              />
            </TouchableOpacity>
          </TouchableOpacity>  
        </TouchableOpacity>
      );            
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            const newRecent = {
              id: Number(item.user_id),
              username: item.username,
              firstname: item.firstname,
              lastname: item.lastname,
              image_file: item.image_file,
              created_at: new Date()
            };
            insertNewRecent(newRecent).then().catch((error) => {
              console.log(`Insert new todoList error ${error}`);
            });
          }}>
          <Image source={{ uri: item.image_file }} style={styles.gambar} />
          <Text style={styles.userName}>{item.firstname} {item.lastname}</Text>
          <Text style={styles.name}>@{item.username}</Text>
        </TouchableOpacity>  
      );
    }
  }

  updateSearch(value) {
    this.setState({
      text: value,
      page: 1,
      jmlPage: 0,
      dataSource: []
    }, function() {
      this.makeRequest(this.state.text)
    })
  }

  handleLoadMore = async () => {
    if (this.state.page != this.state.jumlahPage) {
      this.setState({
        page: this.state.page + 1,
        isLoading: true
      }, function () {
        this.makeRequest(this.state.text)
      })
    }
  }

  footerList = () => {
    if(this.state.page != this.state.jumlahPage){
      return(
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator loading={this.state.isLoading} size={"small"}/>
        </View>
      )
    } else if(this.state.page == this.state.jumlahPage || this.state.page == -1 && this.state.jumlahPage == -1) {
      return (
        <View></View>
      )
    }
  }

  render() {
    const { search } = this.state;
    if (this.state.isEmpty == true) {
        return (
          <View style={styles.viewStyle}>
            <TextInput
              style={styles.textInputStyle}
              onChangeText={text => this.updateSearch(text)}
              value={search}
              underlineColorAndroid="transparent"
              placeholder={"Search"}
            />
            <Text style={{textAlign: 'center', marginTop: 50}} >Data Tidak Ditemukan</Text>
          </View>
        )
    } else {
      return (
        <View style={styles.viewStyle}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this.updateSearch(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder={"Search"}
          />
          <FlatList
            data={this.state.dataSource}
            keyExtractor={this.keyExtractor}
            ListFooterComponent={this.footerList}
            renderItem={this.renderItem}
            onEndReached={this.handleLoadMore}
            onEndThreshold={100}
            enableEmptySections={true}
            style={{ marginTop: 30 }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 16,
  },

  gambar: {
    top: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 5,
  },

  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    left: 50,
    width: 330,
  },

  userName: {
    color: 'black',
    padding: 5,
    top: 8,
    fontWeight: '500',
    left: 80
  },

  name: {
    top: -4,
    left: 85,
    marginVertical: 15
  },

  delete: {
    position: 'absolute',
    right: 25,
    width: 20,
    bottom: 10,
  },

  icon: {
    position: 'absolute',
    left: 78,
    top: 26
  }
});