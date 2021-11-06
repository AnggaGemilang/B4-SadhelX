import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'


const Profil = () => {
    return (
    <View>
        <View
            style = {{            
            margin:20,
            alignItems: 'center', 
            paddingLeft: 320,
            flexDirection: 'row'
            }}>
            <Text>
                logo
            </Text>
            <Text>
                logo
            </Text>

        </View>

        {/* Status atas */}
            <View
                style = {{
                    top: 50,
                    paddingLeft: 207
                    
                }}
            >
                <Text
                    style = {{
                        fontSize: 20
                    }}
                >
                    ini jumlh polower dll
                </Text>
            </View>
            
            
        {/* nick */}
            <View
                style ={{
                    top: 110,
                    marginHorizontal: 20,
                }}
            >
            <Text
                style = {{
                    fontWeight: 'bold',
                    fontSize: 15
                }}
            >
                thoriq1520
            </Text>
            </View>
            
        {/* KET */}
        <View
            style = {{
                marginHorizontal: 20,
                top: 122,
            }}
            >
            <Text>
                biodata meren
            </Text>
        </View>
        
        {/* PP */}
            
            <View
                style={{
                    paddingHorizontal: 70,
                    top: -40
                    
                }}
            >
                <Text>
                    ini PP
                </Text>
            </View>
            

        {/* Tombol */}
            <View
            style = {{
                marginHorizontal: 15,
                position:'relative',
                
            }}
            >


       {/* Follow */}
       <View>
           
       </View>
        <TouchableOpacity
            style = {{
                width:98,
                // height:29,
                top: 150,
                // bottom: 592,
                backgroundColor: '#4192EF',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                // marginHorizontal: 15,
                borderRadius: 10,
                elevation: 5,              
            }}
            onPress={() => console.log('sukses')}
        >
            <Text
            style = {{
                color: '#fff',
                fontWeight: 'bold'
                
            }}
            >
            Follow
            </Text>
        </TouchableOpacity>
        
        {/* Activity */}
        <TouchableOpacity
            style = {{
                width:98,
                // height:29,
                top: 120,
                // bottom: 592,
                left: 110,
                // right:592,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                // marginHorizontal: 15,
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
                width:98,
                // height:29,
                top: 92,
                //bottom: 598,
                left: 220,
                // right: 82,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                // marginHorizontal: 15,
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
                top: 64,
                //bottom: 598,
                left: 327,
                // right: 82,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                // marginHorizontal: 15,
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

        <View
            style={{
            position:'relative',
            top: 70,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            }}/>

            </View>



        </View>
    )
}

export default Profil

const styles = StyleSheet.create({

})
