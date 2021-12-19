
import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';




const apiKey = 'a40093f0-53ec-11ea-850a-fbf5bb8990ef';

 const processExhibit = results => {
  const processed = 
   
    results.records.map(r => ({
      ...r,

      id: r.objectnumber
    }))
  
  return processed;
};

export default class FindFriends extends Component {

  constructor (props: {}) {
    super(props);

    this.state = {
        page: 1,
        isLoading: true,
        dataSource: [],
        refreshing: true,
        
    };
  }

  componentDidMount () {
    this.makeRequest();
  }

  makeRequest =  () => {

    const { page, search } = this.state;

    
    const url =
            `https://api.harvardartmuseums.org/object?apikey=${apiKey}` +
            `&title=${search}`+
            `&fields=objectnumber,dated,century,division,primaryimageurl,title` +
            `&sort=totalpageviews` +
            `&page=${page}` +
            `&size=44` +
            `&hasimage=1` +
            `&sortorder=desc`;
    setTimeout(() => {
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const results = processExhibit(responseJson);
        this.setState({
          isLoading: false,
          dataSource: results,
          refreshing: false
        });
       
      });
    }, 1500);

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

  renderItem = ({item, index}) => {

    if (!item) {
      return (null)
    }
    
    return (
      // <View 
      
      //   flexDirection="row"
      //   >

      //     <Text style={styles.textStyle}>
      //       {item.title}
      //     </Text>
      //     <Text style={styles.textburik}>
      //       {item.dated}
      //     </Text>
      //     <Image source={{uri:item.primaryimageurl}} style={styles.gambar} />

      // </View>
            <TouchableOpacity
            onPress={() => console.log("Search")}>
              <View flexDirection="row">
                <Image source={{uri:item.primaryimageurl}} style={styles.gambar} />
                <View justifyContent="center">
                  <Text style={styles.textStyle}>{item.title}</Text>
                  <Text style={styles.textburik}>@{item.dated}</Text> 
                </View>
              </View>      
            </TouchableOpacity>
    );
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  updateSearch = search => {
    this.setState({ search });  
    this.makeRequest(search);
  };

  handleLoadMore = () => {
    
    this.setState({ 
      page: this.state.page + 1,
      isLoading: true,
    }, this.makeRequest, )
    

  }


  handleRefresh = () => {

    this.setState({
      page: 1,
      refreshing: true,
      
    }),
    () =>
      this.makeRequest();
  }
  

  render () {
    const { search } = this.state;
    return (
     
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={this.updateSearch}
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
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          ItemSeparatorComponent={this.ListViewItemSeparator}

          onEndThreshold={100}
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