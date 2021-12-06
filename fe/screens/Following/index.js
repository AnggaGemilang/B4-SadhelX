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
  Alert,
  Touchable,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
 
export default class Following extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {data: [], isLoading: false, text: '', page: 1, };
    this.arrayholder = [];

  }
 
  componentDidMount() {
    const url = 'https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member?limit=10&page=1';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          // function() {
          //   this.state.dataSource.concat(responseJson);
          // }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.username  ? item.username.toUpperCase() : ''.toUpperCase();
      // const nick = item.firstname      ? item.firstname.toUpperCase() : ''.toUpperCase();
      // const gambar = item.image_file  ? item.image_file.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
      // return nick.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

handleLoadMore = async () => {
  await this.setState(
    {page: this.state.page+1, isLoading: true})
    const url = 'https://617774f89c328300175f5973.mockapi.io/api/sadhelx/member?limit=10&page=' + this.state.page;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            data: this.state.data.concat(responseJson),
            isLoading: false
          },
          // function() {
          //   this.state.dataSource.concat(responseJson);
          // }
        );
      })
}
  footerList = () => {
    return(
         <View>
      <ActivityIndicator loading={this.state.isLoading} size={"small"}/>
    </View>
    )
   
  }
  render() {
    // if (this.state.isLoading) {
    //   //Loading cenah
    //   return (
    //     <View style={{ flex: 1, paddingTop: 20 }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      //ListView to show with textinput used as search bar
      <View 
      style={styles.viewStyle}>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Cari Teman"
        />
        <Text
          style = {{
            top: 25,
            marginHorizontal: 10,
          }}
        >
          96 Teman
        </Text>
        <FlatList
          data={this.state.data}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          onEndReached={this.handleLoadMore}
          ListFooterComponent={this.footerList}
          renderItem={({ item }) => (
            <TouchableOpacity>
            <Image source={{uri:item.image_file}} style={styles.gambar} />
               <Text style={styles.textStyle}>{item.username}</Text>
               <Text style={styles.textburik}>{item.firstname}</Text>
                
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
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  textStyle: {
    padding: 5,
    marginHorizontal: 5,
    fontWeight: '900',
    left: 60
  },
  textburik: {
    fontWeight: '500',
    padding: 10,
     left: 60
  },

  gambar: {
    top: 10,
    padding: 15,
    width: 50,
    height:50,
    borderRadius: 40,
    position: 'absolute'

  },
  textInputStyle: {
    height: 40,
    top: 20,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
});
