import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
// import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const[userNumber, setUserNumber] = useState();
  const[gameIsOver, setGameIsOver] = useState(true);
  const[guessRounds, setGuessRounds] = useState(0);

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    setGameIsOver(false)
  }
 
  // const [fonstLoader]=useFonts({
  //     'alegreya':require("./assets/fonts/Alegreya/Alegreya-Italic-VariableFont_wght.ttf")
  // })

  // if(!fonstLoader)
  // {
  //   return <AppLoading/>
  // }

  function gameOverHandler(numberOfRounds){
    setGameIsOver(true) 
    setGuessRounds(numberOfRounds)
  }
  function startNewGameHandler(){
    setUserNumber(null)
    setGuessRounds(0)
  }
  
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>

  if(userNumber)
  {
    screen= <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
  if(gameIsOver && userNumber)
  {
    screen= <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }

  

  return (
    <LinearGradient colors={["#ddb52f", "#57062e"]} style={styles.rootScreen}>
      <ImageBackground 
      source={require("./assets/images/backgroundimg.jpg")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.bacgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen:{
    flex:1,
  },
  bacgroundImage:{
    opacity:0.15
  }
});
