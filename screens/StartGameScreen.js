import { Alert, 
    Dimensions, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
    
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Title from "../components/ui/Title";
//import { Colors } from "react-native/Libraries/NewAppScreen";
import Colors from "../constants/colors"
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickNumber}){
    const [enteredNumber, setEnteredNumber]=useState('')

    const {width, height} = useWindowDimensions()

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler(){
        const chosenNumber = parseInt(enteredNumber);
        if(isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99)
        {
            Alert.alert(
                'Invalid Number',
                'Number has to be a number between 1 and 99',
                [{text:"Ok", style:"destructive", onPress: resetInputHandler}]
            );
        }
        onPickNumber(chosenNumber)
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return(
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootcontainer, {marginTop: marginTopDistance}]}>
                <Title>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a number</InstructionText>
                <TextInput 
                style={styles.numberInput} 
                maxLength={2}
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                value={enteredNumber}
                onChangeText={numberInputHandler}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>                    
                    </View>
                </View>
            </Card>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height 

const styles= StyleSheet.create({
    screen:{
        flex:1,
    },
    rootcontainer:{
        flex:1,
        // marginTop:deviceHeight<380 ? 30 : 100,
        alignItems:"center",
    },
    
    numberInput:{
        height:50,
        width:50,
        fontSize:32,
        borderBottomColor:"#ddb52f",
        borderBottomWidth:2,
        color:"#ddb52f",
        marginVertical:8,
        fontWeight:"bold",
        textAlign:"center",
    },
    buttonsContainer:{
        flexDirection:"row",
    },
    buttonContainer:{
        flex:1
    },
    
})