import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'


export default class Follow extends Component {

  state = {
    toggle:true
  }

  Followed(){
    const newState = !this.state.toggle;
    this.setState({toggle:newState});
    
    const options = {
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

    fetch( 'http://192.168.1.9:8080/api/teman', options)
    .then( response => response.json() )
    .then( response => {
        console.log(response)
        if(response.is_private)
            this.setState({textValue:"Requested"})
        else
            this.setState({textValue:"Followed"})
    })
    .catch( response => {
        this.state = true
        console.log(response)
    })
  }

  render() {

    const {toggle} = this.state;
    const Teman = toggle?"Follow":this.state.textValue;
    const TombolBg = toggle? "#16C79C":"#808080";
    
    return (
     <View>
           {/* Status atas */}
            <View
                style = {{
                    position: 'absolute',
                    paddingVertical: 100,
                    left: 210,
                    flex: 1,
                }}
            >
                <Text
                    style = {{
                        fontSize: 20
                    }}
                >
                    Jumlah Polower
                </Text>
            </View>     
        
                    {/* PP */}
            

                    {/* nick */}
            <View
                style ={{
                    position: 'absolute',
                    marginHorizontal: 30,
                    marginVertical: 170,
                    flex: 1,
                }}
            >
            <Text
                style = {{
                    fontWeight: 'bold',
                    fontSize: 20
                }}
            >
                thoriq1520
            </Text>
            </View>
                
                {/* KET */}
        <View
            style = {{
                position: 'absolute',
                marginHorizontal: 30,
                marginVertical: 200,
                flex: 1,
            }}
            >
            <Text
                style = {{
                    fontSize: 15
                }}
            >
                Biodata
            </Text>
        </View>

            {/* Tombol */}
            <View
            style = {{
                marginHorizontal: 15,
                position: 'absolute',
                flexDirection: 'row',
                marginVertical: 250,
                flex: 1,
            }}
            >


       {/* Follow */}
        <TouchableOpacity
            
            style = {{
                width: 120,
                height: 30,
                backgroundColor: TombolBg,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                marginHorizontal: 5,
                borderRadius: 10,
                elevation: 5,              
            }}
            onPress={() => this.Followed()}
            
        >
            <Text
            style = {{
                color: '#fff',
                fontWeight: 'bold'
            }}
            >
            {Teman}
            </Text>
        </TouchableOpacity>
        
        {/* Activity */}
        <TouchableOpacity
            style = {{
                width: 120,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                marginHorizontal: 5,
                borderRadius: 10,
                elevation: 5
            }}
        >
            <Text
            style = {{
                color: '#fff',
                fontWeight: 'bold'
            }}
            >
            Activity
            </Text>
        </TouchableOpacity>
            
        {/* Menus */}
        <TouchableOpacity
            style = {{
                width: 120,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                marginHorizontal: 5,
                borderRadius: 10,
                elevation: 5
            }}
        >
            <Text
            style = {{
                color: '#fff',
                fontWeight: 'bold'
            }}
            >
            Menus
            </Text>
        </TouchableOpacity>
            
        {/* dll */}
        <TouchableOpacity
            style = {{
                width:32,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                marginHorizontal: 15,
                borderRadius: 10,
                elevation: 5
            }}
        >
            <Text
            style = {{
                color: '#fff',
                fontWeight: 'bold'
            }}
            >
            V
            </Text>
        </TouchableOpacity>
            </View>
        </View>
    )
  }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
    }
  })
