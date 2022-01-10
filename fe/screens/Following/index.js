import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import axios from 'axios'

export default class Followers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      page: 1,
      jumlahPage: 0,
      jumlahData: 0,
      text: "",
      isEmpty: false
    };
  }

  fetchData = async (text) => {
    this.setState({
      isEmpty: false
    })
    try {
      let response
      if (text != "") {
        response = await axios.get(`http://192.168.1.8:8080/api/following/8/${text}?limit=8&page=${this.state.page}`);
      } else {
        response = await axios.get(`http://192.168.1.8:8080/api/following/8?limit=8&page=${this.state.page}`);
      }
      if (this.state.page == 1) {
        this.setState({
          isLoading: false,
          jumlahData: response.data.total_jml_data,
          data: response.data.data,
          jumlahPage: Math.ceil(response.data.total_jml_data / response.data.limit)
        }, function () {
          console.log(response.data.message)
        })
      } else {
        this.setState({
          isLoading: false,
          jumlahData: response.data.total_jml_data,
          data: this.state.data.concat(response.data.data)
        }, function () {
          console.log(response.data.message)
        })
      }
    } catch (error) {
      if (error.response.status == 404){
        this.setState({
          isEmpty: true
        })
      }
    }
  }

  componentDidMount = () => {
    this.fetchData(this.state.text)
  }

  SearchFilterFunction(value) {
    this.setState({
      text: value,
      page: 1,
      data: []
    }, function() {
      this.fetchData(this.state.text)
    })
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          backgroundColor: '#080808',
          marginTop: 15,
          marginBottom: 15,
        }}
      />
    );
  };

  handleLoadMore = async () => {

    if (this.state.page != this.state.jumlahPage) {
      this.setState({
        page: this.state.page + 1,
        isLoading: true
      }, function () {
        this.fetchData(this.state.text)
      })
    }

  }

  footerList = () => {

    if (this.state.page != this.state.jumlahPage) {
      return (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator loading={this.state.isLoading} size={"small"} />
        </View>
      )
    } else {
      return (
        <View></View>
      )
    }
  }

  render() {
    if (this.state.isEmpty == true) {
      return (
        <View style={styles.viewStyle}>
          <Text style={{textAlign: 'center'}} >Data Tidak Ditemukan</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.viewStyle}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Cari Teman"
            clearButtonMode='always'
          />
          
          <Text
            style={{
              top: 25,
              marginHorizontal: 10,
            }}
          >
            {this.state.jumlahData} Teman
          </Text>

          <FlatList
            data={this.state.data}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.footerList}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => console.log("Member")}>
                <View flexDirection="row">
                  <Image source={{ uri: item.image_file }} style={styles.gambar} />
                  <View justifyContent="center">
                    <Text style={styles.textStyle} >{item.firstname + " " + item.lastname}</Text>
                    <Text style={styles.textburik} >@{item.username}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            enableEmptySections={true}
            style={{ marginTop: 30 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
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
    height: 65,
    marginEnd: 20,
    borderRadius: 40
  },

  textInputStyle: {
    height: 45,
    top: 10,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});