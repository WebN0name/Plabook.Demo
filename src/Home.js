import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions, Image, TouchableHighlight, TouchableOpacity, Picker } from 'react-native'
import axios from 'react-native-axios';

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            textName: [],
            images: [],
            texts: [],
            currentText: [],
            currentTextName: '',
            currentImage: '',
            isClick: false,
            forSale: [],
            currentForSale: '',
            currentPercent: '0%'
        }
    }

    componentDidMount() {
        axios.get('https://fd1f0680cfc8.ngrok.io/texts').then(r => {
            console.log(r)
            for(let i = 0; i< r.data.length; i++){
                this.state.textName.push(r.data[i].name)
                this.state.images.push(r.data[i].image)
                this.state.forSale.push(r.data[i].text)
                const tmp = r.data[i].text.split(' ')
                let finalText = []
                for(let j=0; j<tmp.length; j++){
                    let oneWord = {
                        word: tmp[j],
                        style: 'default'
                    }
                    finalText.push(oneWord)
                    if(j !== tmp.length -1){
                        oneWord = {
                            word: ' ',
                            style: 'default'
                        }
                        finalText.push(oneWord)
                    }
                }
                this.state.texts.push(finalText)
            }
            this.setState({
                currentText: this.state.texts[0],
                currentTextName: this.state.textName[0],
                currentImage: this.state.images[0],
                currentForSale: this.state.forSale[0]
            })
        })
      }

    _jewelStyle =  (value) => {
        if(value === 'default'){
            return{
                backgroundColor: 'transparent',
                fontSize: 36,
                lineHeight: 60
            }
        }

        if(value === 'wrong'){
            return{
                backgroundColor: 'rgba(255, 0, 0, 0.7)',
                fontSize: 36,
                borderRadius: 6,
                lineHeight: 60
            }
        }

        if(value === 'right'){
            return{
                backgroundColor: 'rgba(0, 128, 0, 0.7)',
                fontSize: 36,
                borderRadius: 6,
                lineHeight: 60
            }
        }
    }

    _recordAudioButton = () => {
        axios.post('https://fd1f0680cfc8.ngrok.io/checkRecord', {
            textName: this.state.currentTextName,
            recordId: '5ee6d8977324544e38e8dca4'
        }).then(r => {
            const answers = r.data
            let tmp = this.state.currentText
            let j = 0
            for(let i=0;i<tmp.length; i++){
                if(tmp[i].word !== ' '){
                    if(answers[j] === 0){
                        tmp[i].style = 'wrong'
                        j++
                    }else{
                        tmp[i].style = 'right'
                        j++
                    }
                }
            }

            const all = answers.length
            let right = 0
            for(let i = 0; i< all; i++){
                if(answers[i] === 1){
                    right++
                }
            }

            let percent = (right/all)*100
            percent = Math.trunc(percent)
            let perstr = `${percent}%`
            this.setState({
                currentText: tmp,
                currentPercent: perstr
            })
        })
    }

    _setSelectValue(value){
        for(let i =0; i<this.state.textName.length; i++){
            if(this.state.textName[i] === value){
                this.setState({
                    currentText: this.state.texts[i],
                    currentImage: this.state.images[i],
                    currentForSale: this.state.forSale[i],
                    currentPercent: '0%'
                })
            }
        }
    }

    _setPercent = (value) => {
        return{
            width: value,
            height: 30,
            borderRadius: 15,
            backgroundColor: 'green',
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <ImageBackground source= {'data:image/jpeg;base64,' + this.state.currentImage} style={styles.bg}>
                    <View style={styles.leftSide}>
                        <View style={styles.textBlock}>
                            <Text>
                                {this.state.currentText.map(item => (
                                    <Text style={this._jewelStyle(item.style)}>{item.word}</Text>
                                ))}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rightSide}>
                        <TouchableOpacity onPress={this._recordAudioButton} style={styles.birdButton}>
                            <Image source={require('../assets/Bird.png')} style={styles.bird}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.overlay}>
                        <View style={styles.selects}>
                            <Picker style={styles.customPicker} onValueChange={(itemValue) => this._setSelectValue(itemValue)}>
                                {this.state.textName.map(name=> (
                                    <Picker.Item label={name} value={name}/>
                                ))}
                            </Picker>
                            <View style={styles.progress}>
                                <View style={this._setPercent(this.state.currentPercent)}>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    progress: {
        width: '100%',
        height: 40,
        padding: 3,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    container: {
      width: '100%',
    },
    microBtn: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    micro:{
        fontSize: 36
    },
    bg:{
        width: '100%',
        height: 800,
        flexDirection: 'row'
    },
    leftSide: {
        width: '50%',
        backgroundColor: ' rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        height: 800
    },
    rightSide: {
        width: '50%',
        alignItems: 'flex-end',
        height: 800
    },
    textBlock: {
        width: '80%'
    },
    bird: {
        width: 150,
        height: 130
    },
    overlay: {
        position: 'absolute',
        width: '60%',
        alignItems: 'flex-end',
    },
    selects: {
        width: '30%',
        justifyContent: 'space-between',
        height: 800,
        paddingTop: 20,
        paddingBottom: 20
    }
})