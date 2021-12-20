
import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import axios from 'axios'
import { insertNewRecent, deleteRecentData, queryRecentLists } from '../../databases/index'
// import realm from '../../databases/index'

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
    };
  }

  loadDataRecent = () => {
    queryRecentLists().then((recentLists) => {
      if(recentLists == undefined){
        this.setState({ 
          isLoading: false,
          page: -1,
          jumlahPage: -1,
          isRecent: true,
        });
      } else{
        this.setState({
          dataSource: recentLists, 
          isLoading: false,
          page: -1,
          jumlahPage: -1,
          isRecent: true,
        }, function() {
          console.log(recentLists)
        });
      }
    }).catch((error) => {
      this.setState({ isLoading: false, dataSource: [] });
    });
  }

  componentDidMount () {
    this.loadDataRecent()
  }

  makeRequest = async (text) => {
    try {
      let response
      if(text != "") {
        response = await axios.get(`http://192.168.1.8:8080/api/member/cari/${text}?limit=8&page=${this.state.page}`);
        if(this.state.page == 1) {
          this.setState({
            isLoading: false,
            jumlahData: response.data.total_jml_data,
            dataSource: response.data.data,
            isRecent: false,
            jumlahPage: Math.ceil(response.data.total_jml_data / response.data.limit)
          }, function(){
            console.log(response.data.message)
            console.log(this.state.dataSource)
          })
        } else {
          this.setState({
            isLoading: false,
            jumlahData: response.data.total_jml_data,
            dataSource: this.state.dataSource.concat(response.data.data)
          }, function () {
            console.log(response.data.message)
            console.log(this.state.dataSource)
          })
        }
      } else {
        this.loadDataRecent()
      }
    } catch (error) {
      console.error(error);
    }
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          backgroundColor: '#080808',
          marginBottom: 20,
          marginTop: 15,
        }}
      />
    );
  };

  renderItem = ({item}) => {
    if (this.state.isRecent) {
      return (
        <TouchableOpacity
          onPress={() => {
            console.log("Dipencet")
          }}>
          <View flexDirection="row">
            <Image source={{uri:item.image_file}} style={styles.gambar} />
              <View justifyContent="center">
                <Text style={styles.textStyle}>{item.firstname + " " + item.lastname}</Text>
                <Text style={styles.textburik}>@{item.username}</Text> 
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    deleteRecentData(item.id).then().catch(error => {
                      alert(`Failed to delete recentItem with id = ${id}, error=${error}`);
                    });
                    this.loadDataRecent()
                  }} >
                    <Text>Hapus</Text>
                </TouchableOpacity>
              </View>
          </View>      
        </TouchableOpacity>
      );            
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            const newRecent = {
              id: Number(item.user_id),
              username : item.username,
              firstname : item.firstname,
              lastname : item.lastname,
              image_file : item.image_file,
              created_at : new Date()
            };
            insertNewRecent(newRecent).then().catch((error) => {
              console.log(`Insert new todoList error ${error}`);
            });
          }}>
          <View flexDirection="row">
            <Image source={{uri:item.image_file}} style={styles.gambar} />
            <View justifyContent="center">
              <Text style={styles.textStyle}>{item.firstname + " " + item.lastname}</Text>
              <Text style={styles.textburik}>@{item.username}</Text> 
            </View>
          </View>      
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
    if(this.state.page != this.state.jumlahPage){
      this.setState({
        page: this.state.page+1,
        isLoading: true
      }, function(){
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
  
  render () {
    const { search } = this.state;
    return (
     
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={ text => this.updateSearch(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder= {"Search"}
        />
        {/* <Image source={require('../../assets/icons/sear.png')} style={styles.icon}/> */}
        {/* <SearchBar
            placeholder="Type something here...."
            onChangeText={this.updateSearch}
            value={search}
            lightTheme
            round
            searchIcon={{ size: 24 }}
        /> */}
        <FlatList
          data={this.state.dataSource}
          keyExtractor={this.keyExtractor}
          ListFooterComponent={this.footerList}
          renderItem={this.renderItem}
          onEndReached={this.handleLoadMore}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          onEndThreshold={100}
          enableEmptySections={true}
          style={{ marginTop: 30 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 16,
  },
  textStyle: {
    padding: 5,
    marginHorizontal: 5,
    fontWeight: '900',

  },
  textburik: {
    fontWeight: '500',
    padding: 10,

  },

  gambar: {
    width: 65,
    height:65,
    marginEnd: 20,
    borderRadius: 40
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
  icon:{
    position: 'absolute',
    left: 78,
    top: 26
  }
});