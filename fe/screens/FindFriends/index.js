
import React, { Component } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Card, SearchBar } from 'react-native-elements';



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

  renderItem = ({item, index}) => {

    if (!item) {
      return null
    }
    
    return (
      <View >
        <Card
          title={item.title}
          image={{uri: item.primaryimageurl}}>
          <Text style={{marginBottom: 10}}>
            Made in {item.dated}
          </Text>
       </Card>
      </View>
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

    this.setState({ page: this.state.page + 1}, this.makeRequest)

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
          placeholder="Find Friends"
        />
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
          onEndThreshold={100}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',

    marginTop: 20,
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
    top: -10,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    left: 50,
    width: 330
  },
});
