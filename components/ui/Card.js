import { Dimensions, StyleSheet, View } from "react-native";

function Card({children}){
    return(
        <View style={styles.card}>
            {children}
        </View>
    );
}
export default Card

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card:{
        // flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:16,
        marginTop:deviceWidth< 380 ? 18 : 36,
        marginHorizontal:24,
        backgroundColor:'#57062e',
        borderRadius:8,
        elevation:4,
    },
})