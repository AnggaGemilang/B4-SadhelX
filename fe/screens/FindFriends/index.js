import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
  TextInput
} from 'react-native'



export default class FindFriends extends Component {
    render() {
        return (

      <View 
      style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          // onChangeText={text => this.SearchFilterFunction(text)}
          // value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Cari Teman"
        />


      </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fccbbc'
    },
    border: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#ff1694',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ff1694',
        position: 'relative',
        borderRadius: 10
  },
  search: {
      position: 'absolute',
      fontSize: 30,
      fontWeight: '900',
      color: '#ff1694'
      
  },
   viewStyle: {
    justifyContent: 'center',
    // flex: 1,
  },
  textInputStyle: {
    height: 40,
    top: 10,
    borderWidth: 2,
    paddingLeft: 20,
    borderColor: '#080808',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    left: 50,
    width: 350
    
  },
  
})