import React from 'react'
import { useWindowDimensions,ScrollView, Image, StyleSheet, Text, View } from 'react-native'
import Title from '../components/ui/Title'
import Colors from '../constants/colors'
import PrimaryButton from '../components/ui/PrimaryButton'

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {

  const {width, height} = useWindowDimensions();
  let imageSize = 300;

  if(width<380)
  {
    imageSize=150
  }
  if(height<400)
  {
    imageSize=80
  }

  const imageStyle={
    width: imageSize,
    height: imageSize
  }

  return (
    // <ScrollView style={styles.screen}>
    <View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image style={styles.image} source={require("../assets/images/success.png")} />
        </View>
        <Text style={styles.summarytext}>
          Your Phone took 
          <Text style={styles.highlight}> {roundsNumber} </Text> 
          rounds to guess the number 
          <Text style={styles.highlight}> {userNumber} </Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
    </View>
    // </ScrollView>
  )
}

export default GameOverScreen

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  rootContainer:{
    flex:1,
    padding:24,
    justifyContent:"center",
    alignItems:"center",
  },
  imageContainer:{
    // width:deviceWidth < 380 ? 200 : 300,
    // height:deviceWidth < 380 ? 200 : 300,
    alignContent:'center'
  },
  image:{
    width:'100%',
    height:'100%',
  },
  summarytext:{
    color:"white",
    fontSize:24,
    textAlign:"center",
    marginVertical:24,
  },
  highlight:{
    color:Colors.accent500,
  }
})