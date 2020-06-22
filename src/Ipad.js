import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import Home from './Home'


export default class Ipad extends React.Component{
    render(){
        return(
            <ImageBackground source={require('../assets/Ipad.png')} style={styles.ipad}>
                <View style={styles.content}>
                    <Home/>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    ipad:{
        width: 1287,
        height: 867,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        width: 1000,
        height: 800,
        backgroundColor: 'red'
    }
})