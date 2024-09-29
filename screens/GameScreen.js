import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import {Ionicons} from '@expo/vector-icons'
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min))+min;

    if(rndNum === exclude && max-min> 1){
        return generateRandomBetween(min, max, exclude);
    }
    else
    {
        return rndNum
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber,onGameOver}){
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currrentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const {width, height} = useWindowDimensions();

    useEffect(()=>{
        if(currrentGuess === userNumber)
        {
            onGameOver(guessRounds.length);
        }
    },[currrentGuess, userNumber, onGameOver])

    useEffect(()=>{
        minBoundary=1
        maxBoundary=100
    },[])

    function nextGuessHandler(direction){
        if((direction === 'lower' && currrentGuess < userNumber) || (direction === 'greater' && currrentGuess > userNumber))
        {
            Alert.alert("Don't lie!.. You Kow this is wrong..",
                [{text:"Sorry", style:"cancel"},]
            )
            return;
        }
        if(direction==='lower')
        {
            maxBoundary=currrentGuess;
        }
        else
        {
            minBoundary=currrentGuess+1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currrentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [...prevGuessRounds, newRndNumber])
    }


    const guessRoundsListLength = guessRounds.length

    let content = (<>
        <NumberContainer>{currrentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        
        </>)

        if(width > 500)
        {
            content = (<>
            {/* <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText> */}
            <View style={styles.buttonContainerWide}>
            <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                <NumberContainer>{currrentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
            </View>
            </>)
        }

    return(
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList 
                data={guessRounds} 
                renderItem={(itemData)=> <GuessLogItem roundNumber={guessRoundsListLength-itemData.index} guess={itemData.item}/>}
                keyExtractor={(item)=> item}
                />
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        alignItems:"center",
    },
    buttonsContainer:{
        flexDirection:"row",
    },
    buttonContainer:{
        flex:1
    },
    instructionText:{
        marginBottom:12,
    },
    listContainer:{
        flex:1,
        padding:12,
    },
    buttonContainerWide:{
        flexDirection:"row",
        alignItems:"center"
    }
    
})