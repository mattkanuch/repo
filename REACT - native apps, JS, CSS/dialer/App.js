import React from 'react';
import { View,Button,TextInput,Text,Image,StyleSheet,TouchableHighlight, Alert, Pressable, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Platform } from 'react-native';
import {useState, react} from "react"
import * as Linking from 'expo-linking';
const isOn="True";

export default function App(){
  const [number, setNumber]=useState("");
  const onPress=()=>setNumber(number);
  const onLongPress=()=>setNumber(number);

  const [isOn, setIsOn]=useState(false);
  const [farba, setFarba]=useState(true);
  const [validity, setValidity]=useState(true);
  const [hide, sethide]=useState(true);

  const onPressButton = function(){
    setIsOn(!isOn);
    setFarba(!farba);
    setValidity(true);

    if(!isOn){
      if(number.length<1){
        setValidity(!validity);
        Alert.alert("Wrong number")
      }
      else{
        setValidity(true);
        setFarba(!farba);
        const url='tel:'+number
        Linking.openURL(url);
      }
    }
  }

  const deletor = function(){
    setNumber(number.slice(0,-1));
    if(number.length<2){
      sethide(true)
    }
  }

  return (
    <View style={{backgroundColor: '#001402'}}>

  <Text style={styles.titleText}>{validity === true ? "Phone" : "Number is not valid!"}</Text>

  <Text style={{ height: 40 ,backgroundColor: '#dbffd9',marginLeft:'10%',marginRight:'10%',marginTop:0,marginBottom:0,textAlign:'center',fontSize:30}}>{number}</Text>

  <Pressable onPress={deletor} onLongPress={()=>sethide(true)+setNumber("")}>
  <Text style={{ height: 30 ,backgroundColor: '#dbffd9',marginLeft:'10%',marginRight:'10%',
    marginTop:0,textAlign:'right', marginBottom:5,fontSize:50, height:60, color: hide=== true ? '#dbffd9' : "#eb4934"}}>◄</Text></Pressable>

    <View style={{flex:1,flexDirection: 'row',backgroundColor: '#001402'}}>
      <View style={{flex: 1, flexDirection: 'column',alignSelf:'center',marginLeft:'10%'}}>
         <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"1\nO_O"} onPress={()=>setNumber(number+1)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"4\nGHI"} onPress={()=>setNumber(number+4)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"7\nPQRS"} onPress={()=>setNumber(number+7)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"*\n "} onPress={()=>setNumber(number+'*')+sethide(false)} color='#00bd13'/></View>
         <Button title={"\n\n"} color='#001402'/>
       </View>
      <View style={{flex: 1, flexDirection: 'column',alignSelf:'center'}}>
        <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"2\nABC"} onPress={()=>setNumber(number+2)+sethide(false)} color='#00bd13'/></View>
        <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"5\nJKL"} onPress={()=>setNumber(number+5)+sethide(false)} color='#00bd13'/></View>
        <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"8\nTUV"} onPress={()=>setNumber(number+8)+sethide(false)} color='#00bd13'/></View>
        <View style={{marginBottom:5,marginRight:5,borderWidth:4,borderColor: "#b8d3ff"}}><Pressable onPress={()=>setNumber(number+0)+sethide(false)} onLongPress={()=>setNumber(number+"+")+sethide(false)}>
      <Text style={{textAlign:'center',fontSize:15, height:48,color: "#ffffff",backgroundColor:'#00bd13'}}>0{"\n"}+</Text></Pressable></View>
        <View style={{marginRight:5,}}><Button title={isOn=== true ? "CANCEL \n " : "CALL \n "} onPress={onPressButton} color={farba=== true ? '#00bd13' : "#eb4934"}/></View>

       </View>
       <View style={{flex: 1, flexDirection: 'column',alignSelf:'center',marginRight:'10%'}}>
         <View style={{marginBottom:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"3\nDEF"} onPress={()=>setNumber(number+3)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"6\nMNO"} onPress={()=>setNumber(number+6)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"9\nWXYZ"} onPress={()=>setNumber(number+9)+sethide(false)} color='#00bd13'/></View>
         <View style={{marginBottom:5,borderWidth:4,borderColor: "#b8d3ff"}}><Button title={"#\n "} onPress={()=>setNumber(number+'#')+sethide(false)} color='#00bd13'/></View>
         <Button title={"\n\n"} color='#001402' ></Button>
        </View>
     </View>

     <View style ={{flex:1,backgroundColor: '#001402', marginRight:105, marginLeft:100,marginBottom:9}}>
      <Text></Text>
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,fontWeight: "bold",backgroundColor: '#b3ffc7',marginLeft:'10%',marginRight:'10%',marginTop:30,height:80,
    borderWidth:0,borderColor: "#b8d3ff",color: 'black'
  },

});

