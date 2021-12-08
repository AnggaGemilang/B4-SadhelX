import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default class Member extends Component {

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

    fetch( 'http://192.168.1.8:8080/api/following', options)
    .then( response => response.json() )
    .then( response => {
        console.log(response)
        if(response.is_private){
            this.setState({textValue:"Requested"})
        } else {
            this.setState({textValue:"Followed"})
        }
    })
    .catch( response => {
        this.state = true
        console.log(response)
    })
  }

  render( ) {
    
    const {toggle} = this.state;
    const Teman = toggle?"Follow":this.state.textValue;
    const TombolBg = toggle? "#16C79C":"#808080";
    
    // const { navigate } = this.props.navigation;
    
    return (
     <View>

        {/* <View
            style = {{
                position: 'absolute',
                backgroundColor: '#D8d8d8',
                width: 450,
                height: 450,
                top: 50,
                left: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 40,
                
                
            }}
        >
        

        </View>

        <View
            style = {{            
                // alignContent: 'center',
                position: 'absolute',
                 flexDirection: 'row',
                //  margin: 30,
                paddingVertical: 60,
                //  top: 60,
                paddingHorizontal: 400,
                flex: 1,


            }}>
            <TouchableOpacity
            onPress={() => console.log('pesan')}
            >
            <Image
                source = {require('./assets/pesan.png')}
                style= {{
                    marginRight: 10,
                    
                }}
                
                />
            </TouchableOpacity>


            
            <Image 
                source = {require('./assets/keranjang.png')}
            />
        </View> */}


           {/* Status atas */}
           
            <View
                style = {{
                    position: 'absolute',
                    paddingVertical: 150,
                    left: 180,
                    flex: 1,
                    
                }}
            >
               <TouchableOpacity
               
                onPress={() => this.props.navigation.navigate('Followers')}
               >
                   <Text
                    style = {{
                        fontSize: 20
                    }}
                >
                    Polower
                </Text>
               </TouchableOpacity>                
            </View> 

                        <View
                style = {{
                    position: 'absolute',
                    paddingVertical: 150,
                    left: 300,
                    flex: 1,
                    
                }}
            >
               <TouchableOpacity
               
                onPress={() => this.props.navigation.navigate('Following')}
               >
                   <Text
                    style = {{
                        fontSize: 20
                    }}
                >
                    Polowing
                </Text>
               </TouchableOpacity>                
            </View>     
        
                    {/* PP */}
            
            {/* <View
                style={{
                    position: 'absolute',
                    marginVertical: 100,
                    marginLeft: 20,
                    flex: 1,
                    
                }}
            >
                <Image
                    source = {require('./assets/pp.png')}
                    style ={{
                        width: 120,
                        height: 120,
                    }}
                />
            </View> */}

                    {/* nick */}
            <View
                style ={{
                    position: 'absolute',
                    marginHorizontal: 30,
                    marginVertical: 250,
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
                marginVertical: 280,
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
                // alignItems: 'center',
                // justifyContent: 'center',
                marginVertical: 350,
                flex: 1,
                
            }}
            >


       {/* Follow */}
        <TouchableOpacity
            
            style = {{
                width: 120,
                height: 30,
                // height:29,
                // top: 150,
                // bottom: 592,
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
                // height:29,
                // top: 120,
                // bottom: 592,
                // left: 110,
                // right:592,
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
                // height:29,
                // top: 92,
                //bottom: 598,
                // left: 220,
                // right: 82,
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
                // height:29,
                // top: 64,
                //bottom: 598,
                // left: 327,
                // right: 82,
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
      // position: 'absolute',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
    }
  })

