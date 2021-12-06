import React, { Component } from 'react';
 
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';

import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
 
import axios from 'axios'

export default class Friendlist extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      jumlahData: 0,
      dataProvider: new DataProvider((r1, r2) => r1 !== r2)
    };
  }
 
  layoutProvider = new LayoutProvider( (index) => {
    return index
  }, (_, dim) => {
    dim.width = Dimensions.get('window').width
    dim.height = 95
  })

  fetchData = async (text) => {
    try {
      console.log(text)
      let response
      if(text != "") {
        console.log("Kesatu")
        response = await axios.get(`http://192.168.1.8:8080/api/follower/2/${text}`);
      } else {
        console.log("Kedua")
        response = await axios.get('http://192.168.1.8:8080/api/follower/2');
      }
      this.setState({
        isLoading: false,
        jumlahData: response.data.jml_data,
        dataProvider: this.state.dataProvider.cloneWithRows(response.data.data)
      })
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount = () => {
    this.fetchData("")
  }

  componentWillUnmount = () => {

  }

  SearchFilterFunction(text) {
    this.fetchData(text)
  }

  rowRenderer = (_, item) => {
    return (
      <TouchableOpacity>
        <View flexDirection="row">
          <Image source={{uri:item.image_file}} style={styles.gambar} />
          <View justifyContent="center">
            <Text style={styles.textStyle}>{item.firstname + " " + item.lastname}</Text>
            <Text style={styles.textburik}>@{item.username}</Text> 
          </View>
        </View>      
      </TouchableOpacity>
    )
  }

  render() {
    //Loading cenah
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <Text
          style = {{
            fontSize: 30,
            fontWeight: 'bold'
          }} >
          All Friend
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }} />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Cari Teman"
        />
        <Text
          style = {{
            marginLeft: 3,
            marginTop: 30,
            marginBottom: 15
          }} >
          {this.state.jumlahData} Teman
        </Text>

        <RecyclerListView
          dataProvider={this.state.dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this.rowRenderer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },

  textStyle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5
  },
  
  textburik: {
    fontSize: 15,
    fontWeight: '500'
  },

  gambar: {
    width: 65,
    height:65,
    marginEnd: 20,
    borderRadius: 40
  },

  textInputStyle: {
    height: 50,
    top: 20,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
