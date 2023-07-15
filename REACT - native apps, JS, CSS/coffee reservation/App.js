import 'react-native-gesture-handler';   //multi screen

import React from 'react';
import { Text, View, Image ,ToastAndroid, StyleSheet, ScrollView, SafeAreaView,
         Alert, Pressable, TouchableOpacity, ImageBackground, Dimensions,
         Platform, Linking,
        } from 'react-native';
import {useState} from "react";


export default function App() {


  const PressLogo=function(){
    console.log("Logo pressed!");
  }

  const [current, setCurrent]=useState('Home');

// --------------------------- Choose Language ---------------------------------*/
const [lang, setlang]=useState("ENG");

const ChooseENG = function(){setlang("ENG"),console.log("User Chose ENG")};
const ChooseSK = function(){setlang("SK"),console.log("User Chose SK")}

//------------------------ Find Screen Resolution ------------------------------*/
var heightSCRN=Math.round(Dimensions.get('window').height);
var widthSCRN=Math.round(Dimensions.get('window').width);

// -------------------------- Night/Light Mode ---------------------------------*/
  const [mstyle, setStyle]=useState(styles.light);
  const [tstyle, setTStyle]=useState(styles.lightText);
  const [tstyle2, setTStyle2]=useState(styles.lightText2);
  const [sstyle, setsStyle]=useState(styles.lightShop);
  const [tstyleM, settstyleM]=useState(styles.lightTextMini);
  const [Mode, setMode]=useState("light");

  const PressLightMode = function(){
    setStyle(styles.light);
    setTStyle(styles.lightText);
    setTStyle2(styles.lightText2);
    setsStyle(styles.lightShop);
    settstyleM(styles.lightTextMini);
    setMode("light");
  }

  const PressNightMode = function(){
    setStyle(styles.night);
    setTStyle(styles.nightText);
    setTStyle2(styles.nightText2);
    setsStyle(styles.nightShop);
    settstyleM(styles.NightTextMini);
    setMode("night");
  }

// ----------------------------- Coordinates -----------------------------------*/

const findCoordinatesFunction=function(){
  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);
      console.log(position.coords.latitude,position.coords.longitude);
      var lat2=position.coords.latitude;
      var lon2=position.coords.longitude;
      lat1=48.72451;  //shop lat
      lon1=21,24680;  //shop lon

      const φ1 = lat1 * Math.PI/180, φ2 = lat2 * Math.PI/180, Δλ = (lon2-lon1) * Math.PI/180, R = 6371e3;
      const d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
      var dlz=Number(d.toFixed(1));
      console.log("dlzka =",dlz);
      dlz=Number(dlz.toFixed(0));
      dlzka=""+dlz+"m";
      Alert.alert(
        lang=="ENG" ? "Am I Close?" : "Som blízko?",
        dlzka,
        [
          {
            text:lang=="ENG"? "Close" : "Zavrieť",
          }
        ]
      )
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}

// ----------------------------- Open Check -------------------------------------*/

  var Open="";
  var day=new Date().getDay();
    var hours=new Date().getHours();
    if(day>=1 && day<=5){
      if(hours<20 && hours>8){
        Open=lang=="ENG"? "OPEN" : "OTVORENÝ";
      }
      else{
        Open=lang=="ENG"? "CLOSED" : "ZATVORENÝ";
      }
    }
    else{
      Open=lang=="ENG"? "CLOSED" : "ZATVORENÝ";
    }

  // ----------------------------- Vibe Check -----------------------------------*/

  const VibeCheck=function(){
    setCurrent(HomeScreen);
  }


  //------------------------ Reserve Table Function -----------------------------*/
  var ReservationPending=false

  const TableReserve=function(Table){
    if(ReservationPending==false){
      ReservationPending=true;
      console.log(Table);
      const ReserveScreen=(
        <View style={mstyle}>
          <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
          <Text style={tstyle2}>{lang=="ENG"? "You reserved Table number: " : "Rezervovali ste si stôl číslo: "} {Table}.{"\n"}{lang=="ENG"? "This Table will be reserved for you for next 10 minutes." : "Tento stôl bude rezervovaný pre Vás najbližších 10 minút."}{"\n"}</Text>
          <TouchableOpacity onPress={()=>setCurrent(TableScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
        </View>
      );
      setCurrent(ReserveScreen);
    }
    else{
      Alert.alert(
        lang=="ENG"? "Warning!" : "Varovanie!",
        lang=="ENG"? "You already have a pending reservation.":"Už máte prebiehajúcu rezerváciu stola.",
        [
          {
            text:lang=="ENG"? "Close" : "Zavrieť",
          }
        ]
      )
    }
  };

  /*---------------------------- Timer function ---------------------------------*/
  //Pending order Timer
  var i=15;

  function Timer(){
    setTimeout(function(){
      console.log(i);
      i--;
      if (i>=0 && OrderPending==true){
        if(i==14){
          ToastAndroid.show(lang=="ENG"? "Timer Started" : "Časovač spustený",ToastAndroid.LONG);
        }
        if(i==10){
          ToastAndroid.show("10s",ToastAndroid.SHORT);
        }
        else if(i==5){
          ToastAndroid.show("5s",ToastAndroid.SHORT);
        }
        else if(i==0){
          clearTimeout();
          setCurrent(BeingPreparedScreen);
          Timer2();
        }
        Timer();
      }
      else if(OrderPending==false){
        i=15;
      }
    },1000);
  }
  //prepare timer -------
  var j=15;
  function Timer2(){
    if(j<0){
      j=15;
    }
    setTimeout(function(){
      console.log(j);
      j--;
      if (j>=0){
        if(j==14){
          ToastAndroid.show(lang=="ENG"? "Timer Started" : "Časovač spustený",ToastAndroid.LONG);
        }
        else if(j==10){
          ToastAndroid.show("10s",ToastAndroid.SHORT);
        }
        else if(j==5){
          ToastAndroid.show("5s",ToastAndroid.SHORT);
        }
        else if(j==0){
          clearTimeout();
          OrderPending=false;
          setCurrent(CaffeeReadyScreen);
        }
        Timer2();
      }
    },1000);
  }

  /*---------------------------- Order functions --------------------------------*/

  var Show=true; //show Alert when ordering for the first time
  var OrderPending=false;

  const Order=function(){
    if(OrderPending==true){
      Alert.alert(
        lang=="ENG"? "Warning" : "Varovanie",
        lang=="ENG"? "You already have one order pending" : "Už máte jednu prebiehajúcu objednávku",
        [
          {
          text:lang=="ENG"?"Close":"Zavrieť",
        }
      ]
      )
    }
    else if(OrderPending==false){
      console.log("order coffe pressed!")
      if(Show==true){
        Alert.alert(
          lang=="ENG"?"Are you sure?":"Ste si istý?",
          lang=="ENG"?"Pressing 'Yes' will notify shop staff to start making this coffee for you and if you can't make it to shop in 30 minutes, your account will be penalised. Do you want to order?":"Stlačením tlačidla 'Áno' upozorníte zamestnancov aby Vám začali robiť túto kávu a ak nestihnete prísť do obchodu do 30 minút, Váš účet bude penalizovaný.",
          [
            {
            text: lang=="ENG"?"Yes":"Áno",
            onPress: function(){
              if(i<=0){
                i=15;
              }
              console.log("pressed order Yes, Initiate Order!");
              OrderPending=true;
              console.log("Order pending:",OrderPending);
              Timer();
              setCurrent(OrderPendingScreen);
              }
            },
            {
            text: lang=="ENG"?"No":"Nie",
              onPress: function(){
              console.log("pressed order No!");
              }
            },
            {
              text: lang=="ENG"?"Don't show again":"Už znovu nezobrazuj",
              onPress: function(){
                console.log("pressed order Don't show again!");
                Show=false;
              }
            }
          ]
        )
      }
      else{
        if(i<=0){
          i=15;
        }
        OrderPending=true;
        console.log("Order pending:",OrderPending);
        Timer();
        setCurrent(OrderPendingScreen);
      }
    }
  }

  //cancel order ------
  const CancelOrder=function(){
    OrderPending=false;
    console.log("OrderPending is:",OrderPending);
    if(returntoMix=="true"){
      setCurrent(MixScreen);
      returntoMix="false";
    }
    else{
      setCurrent(OrderCanceledScreen);
    }
  }

  //order again -------
  const OrderAgain=function(){
    OrderPending=true;
    console.log("OrderPending is:",OrderPending);
    if(i<=0){
      i=15;
    }
    Timer();
    setCurrent(OrderPendingScreen);
  }
  // order code -------
  var code="5xtfg1";

  /*----------------------------- Order Page------------------------------------ */
  const OrderPendingScreen=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Text style={tstyle2}>{lang=="ENG"?"Your Order is Pending... If you wish to cancel this order you can within next 15 seconds.\n":"Vaša objednávka prebieha... Ak si prajete zrušiť túto objednávku, môžte takto spraviť v nasledujúcich 15 sekndách.\n"}</Text>
      <TouchableOpacity onPress={CancelOrder}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Cancel Order":"Zruš Objednávku"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Back":"Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const OrderCanceledScreen=(

    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Text style={tstyle2}>{lang=="ENG"?"Your order was canceled." : "Vaša Objednávka bola zrušená."}</Text>
      <TouchableOpacity onPress={OrderAgain}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Order Again" : "Znovu objednaj"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Back":"Späť"}</Text></View></TouchableOpacity>
    </View>
  );

 /*------------------------------ caffee is being prepared screen ----------------*/
 const BeingPreparedScreen=(
  <View style={mstyle}>
    <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
    <Text style={tstyle2}>{lang=="ENG"?"Your caffee is being prepared!\nYour caffee will be ready within next 5 minutes.\nYou will be notified when your caffe is ready.\nYou can browse App with timer in background." 
                      :"Vaša káva sa pripravuje\nVaša káva bude pripravená do piatich minút.\nBudete upozornený keď bude káva hotová.\nMôžte prehliadať Aplikaciu s časovačom na pozadí"}</Text>
    <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Home":"Domov"}</Text></View></TouchableOpacity>
  </View>
  );

  /*------------------------------ caffee is ready screen -----------------------*/

  const CaffeeReadyScreen=(

    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Text style={tstyle2}>{lang=="ENG"?"Your caffee is ready!\nUse this code at checkout:\n":"Vaša káva je pripravená!\nPoužite tento kód pri platení:\n"}</Text>
      <Text style={{alignItems:'center',justifyContent:'center',color:Mode=="light"?"black":"white",fontSize:30,fontWeight:'bold'}}>{code}{"\n"}</Text>
      <Image source={require('./assets/QR/QR1.png')} style={{width:150,height:150}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "\nThank you for using our app, and shopping at our shop! Have a nice day! :)":"\nĎakujeme že používate našu aplikáciu a nakupujete v našom obchode! Prajeme pekný deň! :)"}</Text>
      <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"?"Home":"Domov"}</Text></View></TouchableOpacity>
    </View>
    );

  /* ------------------------------ Open Maps -----------------------------------*/
  var lat=48.72456446715784;
  var lng=21.246810394235144;

  const OpenMaps=function(){
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url)
  }
  /* --------------------------- Open weather API ------------------------------ */

  function getWeather() {
    var cityID='865084';
    var key = '78573e111e667754c00effef8f085e35';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key +'&units=metric')
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data.main.temp);
      var tempo=data.main.temp;
      var temp = '' + tempo;
      Alert.alert(
        lang=="ENG"? "Current Temperature": "Aktuálna teplota",
        temp+"°C",
        [
          {
            text:lang=="ENG"? "Close" : "Zavrieť",
          }
        ]
      )
    })
    .catch(function() {
      // catch any errors
    });
  };


  /*----------------------------- product pages ---------------------------------*/
  /*---  1st column ---*/
  const Screen1=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/1.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Espresso 1,2€\n\nThe espresso, also known as a short black, is approximately 30 ml. of highly concentrated coffee.\nAlthough simple in appearance, it can be difficult to master.\n\nRatio: 1 shot of Espresso\nCup: 60-120 ml. Espresso Cup"
                                       : "Espresso 1,2€\n\nEspresso, tiež známe ako short black, obsahuje približne 30 ml. vysoko koncentrovanej kávy.\nAj keď vyzerá jednoducho, je zložité ju spraviť perfektne.\n\nPomer: 1 šálka Espressa.\nPohár: 60-120 ml. šálka na Espresso."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen2=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/2.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Black Eye 2,7€\n\nThe Black Eye is just the doubled version of The Red Eye and is very high in caffeine.\n\nRatio: 2 shots of espresso + 180 ml. of drip-brewed coffee\nCup: 240-300 ml. Coffee Mug"
                                       : "Black Eye 2,7€\n\nBlack Eye je dvojitá verzia kávy Red Eye a obsahuje veľké množstvo kofeínu\n\nPomer: 2 šálky Espressa + 180 ml. prekvapkávanej kávy\nPohár: 240-300 ml. hrnček na kávu"}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen3=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/3.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Macchiato 1,5€\n\nThe word “Macchiato” means mark or stain. This is in reference to the mark that steamed milk leaves on the surface of the Espresso as it is dashed into the drink. Flavoring syrups are often added to the drink according to customer preference.\n\nRatio: 1 shot of Espresso + 1 to 2 teaspoons of steamed milk.\nCup: 90 ml. Glass Espresso Cup."
                                       : "Macchiato 1,5€\n\nSlovo “Macchiato” znamená škvrna alebo fľak. Toto je referencia na škvrnu, ktorú zanechá mlieko na povrchu Espressa pri vlievaní do kávy. Dochucovacie sirupy sú často pridávané do kávy poďľa zákazníkovej chuti a preferencie.\n\nPomer: 1 šálka Espressa + 1 až 2 čajové lyžičky napareného mlieka.\nPohár: 90 ml. Sklenený pohár na Espresso."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen4=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/4.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Breve 1,5€\n\nThe Breve provides a decadent twist on the average Espresso, adding steamed half-and-half to create a rich and creamy texture.\n\nRatio: 1 shot of espresso + 90 ml. of steamed half-and-half + 1 cm of foam.\nCup: 180-210 ml. Low Cup."
                                        :"Breve 1,5€\n\nBreve poskytuje nový pohľad na priemerné Espresso, pridávaním napareného Espressa vytvoríme bohatú a krémovú textúru.\n\nPomer: 1 šálka Espressa + 90 ml. napareného Espressa + 1 cm peny.\nPohár: 180-210 ml. nízka šalka."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen5=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/5.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Caffé Latte 2,5€\n\nCaffee Lattes are considered an introductory coffee drink since the acidity and bitterness of coffee is cut by the amount of milk in the beverage. Flavoring syrups are often added to the Latte for those who enjoy sweeter drinks.\n\nRatio: 1 shot of espresso + 240-300 ml. of steamed milk + 1 cm of foam.\nCup: 420 ml. Mixing Glass."
                                        :"Caffé Latte 2,5€\n\nCaffee Latte sa považujú za úvodné kávové nápoje, kedže ich kyslosť a horkosť je zjemnená množstvom mlieka v nápoji. Dochucovacie sirupy sú často pridávané do Latte pre tých, ktorí si radi vychutnávajú sladšie nápoje\n\nPomer: 1 šálka Espressa + 240-300 ml. napareného mlieka + 1 cm peny.\nPohár: 420 ml. zmiešavací pohár."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen6=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/6.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Affogato 2,3€\n\nAffogatos are more for a dessert coffee than a drink you would find at a cafe, but they can add a fun twist to ordinary menu. They are made by pouring a shot of Espresso over a scoop of vanilla ice cream to create a sweet after-meal treat.\n\nRatio: 1-2 shots of Espresso + 1 scoop of vanilla ice cream.\nCup: 150-210 ml. Dessert Dish."
                                        :"Affogato 2,3€\n\nAffogato je skôr dezertom s kávou ako nápojom ktorý nájdete bežne v kaviarňach ale dokáže pridať na zaujímavosti obyčajného menu. Pripravuje sa naliatím šálky Espressa na kopček vanilkovej zmrzliny čím sa vytvorí sladký dezert servírovaný po jedle.\n\nPomer: 1-2 šálky Espressa + 1 kopček vanilkovej zmrzliny.\nPohár: 150-210 ml. miska na dezerty."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  /*---  2nd column ---*/
  const Screen7=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/7.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Double Espresso 2,4€\n\nA double Espresso may also be listed as Doppio, which is the Italian word for double. This drink is highly concentrated and strong.\n\nRatio: 2 shots of Espresso\nCup: 90-120 ml. Demitasse Cup."
                                        :"Dvojité Espresso 2,4€\n\nDvojité Espresso môže byť taktiež označované ako Doppio, čo v Taliančine znamená dvojitý. Tento nápoj je vysoko koncentrovaný a silný.\n\nPomer: 2 šálky Espressa\nPohár: 90-120 ml. pohár Demitasse."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen8=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/8.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Americano 1,5€\n\nAmericanos are popular breakfast drinks and thought to have originated during World War II. Soldiers would add water to their coffee to extend their rations farther. The water dilutes the espresso while still maintaining a high level of caffeine.\n\nRatio: 1 shot of Espresso + 90 ml. of hot water.\nCup: 150-180 ml. Glass Coffee Mug."
                                        :"Americano 1,5€\n\nAmericano je populárnym drinkom ku raňajkám, ktorý pravdepodobne vznikol počas II. Svetovej Vojny. Vojaci pridávali vodu do svojich káv aby bol ich prídel vody neskôr zväčšený. Voda rozriedi Espresso pričom si udrží veľké množstvo kofeínu.\n\nPomer: 1 šálka Espressa + 90 ml. horúcej vody.\nPohár: 150-180 ml. sklenený hrnček na kávu."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen9=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/9.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Long Macchiato 2,6€\n\nOften confused with a standard Macchiato, the Long Macchiato is a taller version and will usually be identifiable by its distinct layers of coffee and steamed milk.\n\nRatio: 2 shots of Espresso + 2 to 4 teaspoons of steamed milk.\nCup: 180 ml. Whiskey Glass."
                                        :"Long Macchiato 2,6€\n\nČasto zamieňané so štandardným Macchiatom, Long Macchiato je ale jeho vyššou verziou a je identifikovateľné podľa jeho zreteľných kávových vrstiev a napareného mlieka.\n\nPomer: 2 šálky Espressa + 2 až 4 čajové lyžičky napareného mlieka\nPohár: 180 ml. pohár na Whiskey"}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen10=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/10.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Cappuccino 2,5€\n\nThis creamy coffee drink is usually consumed at breakfast time in Italy and is loved in the United States as well. It is usually associated with indulgence and comfort because of its thick foam layer and additional flavorings that can be added to.\n\nRatio: 1-2 shots of Espresso + 60 ml. of steamed milk + 60 ml. of foamed milk + sprinkling of chocolate powder (optional).\nCup: 180-240 ml. Cappuccino Mug."
                                        :"Cappuccino 2,5€\n\nTento krémový kávový nápoj sa bežne konzumuje počas raňajok v Taliansku a je taktiež veľmi milovaný v USA. Často sa spája s pôžitkárstvom a komfortom vďaka jeho hrubej vrstve peny. Ďalšie dochucovadlá sa taktiež často pridávajú,\n\nPomer: 1-2 šálky Espressa + 60 ml. napareného mlieka + 60 ml. napeneného mlieka + posyp čokoládovým práškom (voliteľné).\nPohár: 180-240 ml. hrnček na Cappuccino."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen11=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/11.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Mocha 2,8€\n\nThe Mocha is considered a coffee and hot chocolate hybrid. The chocolate powder or syrup gives it a rich and creamy flavor and cuts the acidity of the Espresso.\n\nRatio: 1 shot of Espresso + 30-60 ml. of chocolate syrup/powder + 30-90 ml. of steamed milk + 2-3 cm of foam or whipped cream.\nCup: 180-260 ml. Irish Coffee Mug."
                                        :"Mocha 2,8€\n\nMocha sa považuje za hybrid medzi kávou a horúcou čokoládou. Čokoládový prášok alebo sirup dodáva bohatú a krémovú chuť pričom znižuje kyslosť Espressa.\n\nPomer: 1 šálka Espressa + 30-60 ml. čokoládového sirupu/prášku + 30-90 ml. napareného mlieka + 2-3 cm peny alebo šľahačky.\nPohár: 180-260 ml. hrnček na Írsku kávu."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen12=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/12.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Cafe au Lait 2,5€\n\nThe Cafe au Lait is typically made with French Press coffee instead of an Espresso shot to bring out the different flavors in the coffee. It is then paired with scalded milk instead of steamed milk and poured at a 50/50 ratio.\n\nRatio: 150 ml. French press coffee + 150 ml. scalded milk.\nCup: 360 ml. Coffee Mug."
                                        :"Cafe au Lait 2,5€\n\nCafe au Lait typicky obsahuje prekvapkávanú kávu z French Pressu namiesto Espressa preto, aby sa prejavila chuť rôznych káv. Potom je táto káva spojená s prevareným mliekom namiesto napareného mlieka v pomere 50/50.\n\nPomer: 150 ml. kávy z French Pressu + 150 ml. prevareného mlieka.\nPohár: 360 ml. hrnček na kávu."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );
  /*---  3rd column ---*/

  const Screen13=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/13.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Red Eye 2€\n\nThe red eye's purpose is to add a boost of caffeine to your standard cup of coffee.\n\nRatio: 1 shot of Espresso + 180 ml. of drip-brewed coffee\nCup: 240 ml. Coffee Mug."
                                        :"Red Eye 2€\n\nZmyslom kávy Red Eye je pridanie vačšieho množstva kofeínu do vášho štandardného šálku kávy.\n\nPomer: 1 šálka Espressa + 180 ml. prekvapkávanej kávy\nPohár: 240 ml. hrnček na kávu."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen14=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/14.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Long Black 2,6€\n\nThe long black is a similar coffee drink to the Americano, but it originated in New Zealand and Australia. It generally has more crema than an Americano.\n\nRatio: 2 shots of Espresso + 90 ml. of hot water.\nCup: 180-240 ml. Glass Coffee Mug."
                                        :"Long Black 2,6€\n\nLong Black sa podobá nápoju Americano ale pochádza z Nového Zélandu a Austrálie. Zvyčajne je tento nápoj viac krémový ako Americano.\n\nPomer: 2 šálky Espressa + 90 ml. horúcej vody.\nPohár: 180-240 ml. sklenený pohár na kávu."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen15=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/15.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Cortado 1,8€\n\nThe Cortado takes the Macchiato one step further by evenly balancing the Espresso with warm milk in order to reduce the acidity.\n\nRatio: 1 shot of Espresso + 30 ml. of warm milk + 1 cm of foam.\nCup: 180 ml. Rocks Glass."
                                        :"Cortado 1,8€\n\nCortado berie Macchiato o krok ďalej, tým že rovnomerne balancuje Espresso s teplým mliekom aby sa znížila kyslosť.\n\nPomer: 1 šálka Espressa + 30 ml. teplého mlieka + 1 cm peny.\nPohár: 180 ml. pohár na Whiskey."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen16=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/16.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Flat White 2,2€\n\nA Flat White also originates from New Zealand and Australia and is very similar to a Cappuccino but lacks the foam layer and chocolate powder. To keep the drink creamy rather than frothy, steamed milk from the bottom of the jug is used instead of from the top.\n\nRatio: 1 shot of espresso + 120 ml. of steamed milk.\nCup: 180 ml. Glass Tumbler."
                                        :"Flat White 2,2€\n\nFlat White pochádza z Nového Zélandu a Austrálie a je veľmi podobný Cappuccinu ale chýba mu vrstva čokoládového prášku. Aby sa nápoj udržal krémovým a nie speneným, používa sa naparené mlieko zo spodu nádoby, nie z vrchu nádoby.\n\nPomer: 1 šálka Espressa + 120 ml. napareného mlieka.\nPohár: 180 ml. vysoký pohár."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen17=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/17.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Vienna 1,6€\n\nThere are a few variations on the Vienna, but one of the most common is made with two ingredients: Espresso and whipped cream. The whipped cream takes the place of milk and sugar to provide a creamy texture.\n\nRatio: 1-2 shots of Espresso + 60 ml. of whipped cream.\nCup: 120-150 ml. Espresso Mug."
                                        :"Viedenská káva 1,6€\n\nExistuje niekoľko variácií Viedenskej kávy ale najbežnejšia je zložená z dvoch ingrediencií: Espresso a šľahačka. Šľahačka je náhradou za cukor a mlieko aby sa dosiahla krémová textúra.\n\nPomer: 1-2 šálky Espressa + 60 ml. šľahačky.\nPohár: 120-150 ml. pohár na Espresso."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );

  const Screen18=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Image source={require('./assets/coffee/18.png')} style={{width:heightSCRN<600? 150:350, height:heightSCRN<600? 150:350}}></Image>
      <Text style={tstyle2}>{lang=="ENG"? "Iced Coffee 3€\n\nIced coffees become very popular in the summertime in the United States. The recipes do have some variance, with some locations choosing to interchange milk with water in the recipe. Often, different flavoring syrups will be added per the preference of the customer.\n\nRatio: 60 ml. drip coffee or espresso + 120 ml. of ice + 120-180 ml. of milk or water + flavoring syrup to taste.\nCup: 420 ml. Mixing Glass."
                                        :"Ľadová Káva 3€\n\nĽadová Káva sa stáva veľmi populárnou hlavne počas leta v Spojených Štátoch. Recepty majú určité variácie a niektoré kaviarne sa v recepte rozhodnú zamieňať mlieko za vodu. Podľa želania zákazníka sa často pridávajú rôzne dochucovacie sirupy.\n\nPomer: 60 ml. prekvapkávanej kávy + 120 ml. ľadu + 120-180 ml. mlieka alebo vody + dochucovacie sirupy podľa chuti.\nPohár: 420 ml. zmiešavací pohár."}
      </Text>
      <TouchableOpacity onPress={Order}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Order Coffe" : "Objednať kávu"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back" : "Späť"}</Text></View></TouchableOpacity>
    </View>
  );
  /*----------------------------- pages ---------------------------------*/

  const HomeScreen=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <View>
        <Pressable onPress={PressLogo}><Image source={require('./assets/Logo.png')} style={{width:400,height:100,marginBottom:20,marginTop:30}}></Image></Pressable>
      </View>
        <Text style={tstyle2}>{lang=="ENG"? "Shop is currently: " : "Obchod je momentálne: "}{Open}{"\n"}</Text>
        <TouchableOpacity onPress={()=>setCurrent(ShopScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "SHOP" : "OBCHOD"}</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>setCurrent(MixScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "MIX your coffee" : "NAMIXUJ si kávu"}</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>setCurrent(TableScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "RESERVE a Table" : "REZERVÁCIA Stola"}</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>setCurrent(FindScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Where to Find?" : "Kde nájdem Obchod?"}</Text></View></TouchableOpacity>
        <TouchableOpacity onPress={()=>setCurrent(InfoScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>INFO</Text></View></TouchableOpacity>
        <Text style={tstyle2}>{"\n"}{lang=="ENG"? "x --- Ad Space --- x" : "x - Reklamný priestor - x"}{"\n"}</Text>
        <Text style={{flexGrow:1}}></Text>
      <Image source={Mode=="light"? require('./assets/1.jpg'):require('./assets/2.jpg')} style={{width:'100%',height:heightSCRN<600? 100:200,position:'absolute',bottom:0}}></Image>
    </View>
  );

    var w=100;
    var h=110;

    var w1=100;
    var h1=100;

  const ShopScreen=(
    <View style={{backgroundColor:Mode=='light'? '#d4dfff':'black', alignItems: 'center',justifyContent: 'center'}}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:40}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Home" : "Domov"}</Text></View></TouchableOpacity>
      <View style={{flex:0, flexDirection: 'row',marginTop:10}}>
        <View style={{flex: 1, flexDirection: 'column', alignSelf:'center',marginLeft:'5%',marginRight:'5%'}}>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen1)+console.log("1 pressed!")}><Image source={require('./assets/icons/1.png')} style={{width:w1, height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen2)+console.log("2 pressed!")}><Image source={require('./assets/icons/2.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen3)+console.log("3 pressed!")}><Image source={require('./assets/icons/3.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen4)+console.log("4 pressed!")}><Image source={require('./assets/icons/4.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen5)+console.log("5 pressed!")}><Image source={require('./assets/icons/5.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen6)+console.log("6 pressed!")}><Image source={require('./assets/icons/6.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
      </View>
        <View style={{flex: 1, flexDirection: 'column', alignSelf:'center', marginRight:'5%'}}>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen7)+console.log("7 pressed!")}><Image source={require('./assets/icons/7.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen8)+console.log("8 pressed!")}><Image source={require('./assets/icons/8.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen9)+console.log("9 pressed!")}><Image source={require('./assets/icons/9.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen10)+console.log("10 pressed!")}><Image source={require('./assets/icons/10.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen11)+console.log("11 pressed!")}><Image source={require('./assets/icons/11.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen12)+console.log("12 pressed!")}><Image source={require('./assets/icons/12.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
      </View>
        <View style={{flex: 1, flexDirection: 'column', alignSelf:'center'}}>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen13)+console.log("13 pressed!")}><Image source={require('./assets/icons/13.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen14)+console.log("14 pressed!")}><Image source={require('./assets/icons/14.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen15)+console.log("15 pressed!")}><Image source={require('./assets/icons/15.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen16)+console.log("16 pressed!")}><Image source={require('./assets/icons/16.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen17)+console.log("17 pressed!")}><Image source={require('./assets/icons/17.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        <View style={{marginBottom:0,width:w, height:h}}><Pressable onPress={()=>setCurrent(Screen18)+console.log("18 pressed!")}><Image source={require('./assets/icons/18.png')} style={{width:w1,height:h1}}></Image></Pressable></View>
        </View>
    </View>
    <Text style={{flexGrow:1}}>{heightSCRN<600? "\n":"\n\n\n\n\n\n"}</Text>
  </View>
  );


  var h3=20;
  var w3=20;

  const TableScreen=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Home" : "Domov"}</Text></View></TouchableOpacity>
      <Text style={tstyle2}>{lang=="ENG"? "Choose and reserve a table.\n":"Vyberte a rezervujte si stôl.\n"}</Text>
      <ImageBackground source={require('./assets/a.jpg')} style={{width: '100%',height: undefined,aspectRatio: 1500/1000,}}>
        <TouchableOpacity style={{width:w3,height:h3,marginTop:'16%',marginLeft:'25%'}} onPress={()=>TableReserve(4)}><Image source={require('./assets/icons/b4.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginBottom:'0%',marginLeft:'94%'}} onPress={()=>TableReserve(5)}><Image source={require('./assets/icons/b5.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginBottom:'0%',marginLeft:'10%'}} onPress={()=>TableReserve(3)}><Image source={require('./assets/icons/b3.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginBottom:'0%',marginLeft:'92%'}} onPress={()=>TableReserve(6)}><Image source={require('./assets/icons/b6.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginBottom:'0%',marginLeft:'20%'}} onPress={()=>TableReserve(2)}><Image source={require('./assets/icons/b2.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginBottom:'0%',marginLeft:'90%'}} onPress={()=>TableReserve(7)}><Image source={require('./assets/icons/b7.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
        <TouchableOpacity style={{width:w3,height:h3,marginTop:'5%',marginLeft:'8%'}} onPress={()=>TableReserve(1)}><Image source={require('./assets/icons/b1.png')} style={{height:h3,width:w3}}></Image></TouchableOpacity>
      </ImageBackground>
    </View>
  );

  const FindScreen=(
    <SafeAreaView style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
    <ScrollView>
    <View style={mstyle}>
    <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:40}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Home" : "Domov"}</Text></View></TouchableOpacity>
      <Text style={tstyle2}>{lang=="ENG"? "\nMap where our shop is located\n":"\nMapa kde sa nachádza obchod.\n"}</Text>
      <Image source={Mode=="light"? require('./assets/map-day.png'):require('./assets/map-night.png')} style={{width:350, height:400}}></Image>
      <Text style={tstyle}>Námestie L. Novomeského 1443/13  040 01 Košice{"\n"}</Text>
      <TouchableOpacity onPress={findCoordinatesFunction}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Am I Close?":"Som blízko?"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={getWeather}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "What's the Weather?":"Aké je počasie?"}</Text></View></TouchableOpacity>
      <Text style={tstyleM}>According to Openweather® API</Text>
      <TouchableOpacity onPress={OpenMaps}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Open in Maps":"Otvor v mapách"}</Text></View></TouchableOpacity>
      <Text style={mstyle}>{"\n"}</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  );

  const InfoScreen=(
    <SafeAreaView style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Home" : "Domov"}</Text></View></TouchableOpacity>

      <ScrollView>
        <Text style={tstyle2}>
        {lang=="ENG"? "\nThis page is about how our shop and this app works. Choose below what you want to know more about.\n\nOpening Hours:\nMon-Friday: 8:00-20:00\nSat-Sun: CLOSED\n"
                     :"\nTáto stránka je o tom ako táto aplikácia a náš obchod fungujú. Nižšie si vyberte o čom chcete vedieť viac.\n\nOtváracie Hodiny:\nPon-Pia: 8:00-20:00\nSob-Neď: ZAVRETÉ\n"}
        </Text>
      </ScrollView>
      <TouchableOpacity onPress={()=>setCurrent(InfoShop)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Shop Info":"Info o Obchode"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>setCurrent(InfoApp)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "App Info":"Info o Aplikácií"}</Text></View></TouchableOpacity>
    </SafeAreaView>
  );

  const InfoShop=(
    <SafeAreaView style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <View>
      <TouchableOpacity onPress={()=>setCurrent(InfoScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back":"Späť"}</Text></View></TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={tstyle2}>{lang=="ENG"? "Info about Shop\n\nThis shop in Košice was built in 1958 by 3 young brother entrepreneurs and to this day it's a family owned bussiness. The goal of the shop was to provide excellent tasting coffee for a low price which is true to this day.\n\nIn 1978 shop almost burned down to the ground after accident with toppled heater. After that day owners installed different type of heating devices and forbade smoking in the shop.\n\nIn late 1990s owners were regularly sent threatning messages by mafia that if they won't pay money for 'protection' the shop will be wrecked and bombed. They refused and were even threatened by mafia boss himself in person. Luckily nothing worse happened than a few broken windows in 1999. The threats continued until whole mafia syndicate was put behind bars by slovak police in 2000.\n\nNext years were calm and quite successful for the brothers. Today shop still stands and provides excellent coffee for low prices like It always used to."
                                         : "Informácie o obchode\n\nTento Košický obchod bol postavený v roku 1958 troma mladými bratmi - podnikateľmi a do dnešného dňa je to rodinný podnik. Cieľom tohto obchodu bolo zabezpečiť excelentne chutiacu kávu za nízku cenu, čo je pravdou do dnešného dňa.\n\nV roku 1978 obchod takmer zhorel do tla pri nehode s prevrhnutým ohrievačom. Po tomto dni majitelia nainštalovali iný typ ohrievačov a zakázali fajčenie vo vnútri obchodu\n\nV neskorých 90-tych rokoch boli majiteľom často posielané výhražné správy mafiou aby platili peniaze za 'ochranu' inak ich obchod bude zničený a vyhodený do vzduchu. Oni odmietli a prišiel sa im osobne vyhrážať dokonca boss mafie. Našťastie, okrem pár rozbitých okien v roku 1999 sa nič horšie nestalo. Vyhrážky pokračovali až dovtedy kým nebol celý mafiánsky syndikát zatknutý slovenskou políciou v roku 2000.\n\nNásledujúce roky boli pokojné a pre bratov celkom úspešné. Dnes obchod stále stojí a poskytuje excelentnú kávu za nízke ceny ako vždy."}
         </Text>
      </ScrollView>
    </SafeAreaView>
  );

  const InfoApp=(
    <SafeAreaView style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <View>
      <TouchableOpacity onPress={()=>setCurrent(InfoScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Back":"Späť"}</Text></View></TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={tstyle2}>{lang=="ENG" ? "Info about App\n\nThis app provides easy ordering process of your favourite coffee and provides easy reservations of tables in shop\n\nHow to order coffee?\n\n1.) Tap on Shop Button in Main menu of the app.\n2.) Choose coffee you would like to order by tapping on image\n3.) Press Order, and order will be initiated. (If you wish to change or cancel your order you can within next 15 seconds. after passing 15 seconds your order will be considered as pending and staff in shop will start making coffee for you and now, order cannot be cancelled.)\n4.) Wait for notification on your phone, the caffee is now being made in the shop for you\n5.) When you are called for payment by staff or app, please show the QR code to seller.(If you can't make it to seller in 30 minutes since you were called by app or staff, your account will be penalised.)\n6.) Enjoy your coffee :)\n\n\nHow to Mix your own coffee?\n\n1.)Tap on MIX your coffee button in main menu\n2.)Choose Ingredients you would like in your coffe mix. (maximum of 5 of main ingredients, maximum of 2 of additional toppings)\n3.)Press Order button and if you are happy with our mix, press yes button.\n4.)The following ordering process is now same as ordering from menu.\n\n\nHow to reserve a table?\n\n1.)Tap on Reserve a table button in main menu\n2.)Choose a table you would like to reserve by tapping on number of Table.\n3.) You now have a reserved table for next 10 minutes :)"
                                          : "Informácie o aplikácií\n\nTáto aplikácia poskytuje jednoduchý proces objednávania vašej obľúbenej kávy a poskytuje jednoduchú rezerváciu stolov v kaviarni.\n\nAko si objednať kávu?\n\n1.) Kliknite na tlačidlo Obchod v hlavnom menu aplikácie.\n2.) Vyberte si kávu, ktorú by ste si chceli objednať kliknutím na obrázok.\n3.) Kliknite Objednať kávu a objednávka sa začne potvrdzovať. (Ak si prajete zmeniť alebo zrušiť vašu objednávku, môžte tak učiniť do 15 sekúnd od stlačenia tlačidla Objednať. Po uplynutí 15 sekúnd sa bude vaša objednávka považovať za potvrdenú a zamestnanci v obchode začnú pracovať na vašej káve a objednávka už nemôže byť zrušená.)\n4.) Počkajte na upozornenie aplikáciou, v tomto momente sa už pracuje na Vašej káve.\n5.) Keď ste vyzvaný k platbe aplikáciou alebo zamestnancom, prosíme ukážte QR kód pri pokladni.(Ak nestihnete prísť do 30 minút k pokladni od vtedy čo ste boli vyzvaný k platbe, váš účet bude penalizovaný)\n6.) Užite si Vašu kávu\n\n\nAko si namixovať vlastnú kávu?\n\n1).Kliknite na tlačidlo NAMIXUJ si kávu v hlavnom menu\n2.)Vyberte si ingrediencie, ktoré chcete mať vo svojom mixe.(maximum 5 hlavných ingrediencií, maximum 2 dodatočné ingrediencie)\n3.)Stlačte tlačidlo Objednaj a ak ste so svojim mixom spokojný stlačte tlačidlo Áno.\n4.)Následujúci objednávací proces je rovnaký ako pri objednávaní káv z kaviarňového menu.\n\n\nAko si zarezervovať stôl?\n\n1.) Kliknite na tlačidlo Rezervácia stola v hlavnom menu\n2.) Vyberte si stôl ktorý si chcete rezervovať kliknutím na číslo stola.\n3.) Teraz máte rezervovaný stôl na 10 minút :)\n"}</Text>
      </ScrollView>
    </SafeAreaView>
  );

  const MixScreen=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <TouchableOpacity onPress={()=>setCurrent(HomeScreen)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Home" : "Domov"}</Text></View></TouchableOpacity>
      <Text style={tstyle2}>{lang=="ENG"? "Choose Ingredients you like. You can choose up to 5 ingredients + 2 toppings.\n":"Vyberte si ingrediencie ktoré Vám chutia. Môžte si vybrať až 5 ingrediencií + 2 veci na vrch.\n"}</Text>
      <TouchableOpacity onPress={()=>mixLogic("","",0)}><View style = {{backgroundColor:Mode=="light"?'#bf0000':'#630000',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Clear" : "Vymazať"}</Text></View></TouchableOpacity>
      <Text style={tstyle2}>{lang=="ENG"? "Ingredients ↴" : "Ingrediencie ↴"}</Text>
      <TouchableOpacity onPress={()=>mixLogic("Espresso",1.2,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Espresso 30ml." : "Espresso 30ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Dripped Coffee":"Prekvapkávaná káva",1.5,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Dripped Coffee 30ml." : "Prekvapkávaná Káva 30ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Hot Water":"Horúca Voda",0.2,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Hot Water 30ml." : "Horúca Voda 30ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Warm Milk":"Teplé Mlieko",0.3,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Warm Milk 30ml." : "Teplé Mlieko 30ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Hot Milk":"Horúce Mlieko",0.4,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Hot Milk 30ml." : "Horúce Mlieko 30ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Steamed Milk":"Naparené Mlieko",0.5,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Steamed Milk 30ml." : "Naparené Mlieko 30 ml."}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Scalded Milk":"Prevarené Mlieko",0.6,1)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Scalded Milk 30ml." : "Prevarené Mlieko 30 ml."}</Text></View></TouchableOpacity>
      <Text style={tstyle2}>{lang=="ENG"? "Toppings ↴" : "Ingrediencie na vrch ↴"}</Text>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Whipped Cream":"Šľahačka",0.5,2)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Whiped Cream 30g" : "Šľahačka 30g"}</Text></View></TouchableOpacity>
      <TouchableOpacity onPress={()=>mixLogic(lang=="ENG"?"Chocolate Powder":"Čokoládový prášok",0.5,2)}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Chocolate Powder 30g" : "Čokoládový prášok 30g"}</Text></View></TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={()=>orderLogic()}><View style = {{backgroundColor:Mode=="light"?'#00c907':'#005403',alignItems:'center',justifyContent:'center',borderRadius:100,width:300,marginTop:'2%'}}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{lang=="ENG"? "Order" : "Objednaj"}</Text></View></TouchableOpacity>
    </View>
  );

  var repeat1=0;
  var repeat2=0;
  var mix="";
  var finalprice=0;
  const mixLogic=function(name,price,category){
    if(category==0){
      mix="";price="";category="",name="",repeat1=0,repeat2=0,finalprice=0; //reset
    }
    else{
      if(category==1 && repeat1<5){
        mix=mix+" "+name+",";
        finalprice=finalprice+price
        console.log("mix: ",mix,"finalprice: ",finalprice);
        repeat1=repeat1+1;
        ToastAndroid.show(repeat1+"/5 Ingredients",ToastAndroid.SHORT);
      }
      else if(category==1 && repeat1==5){
        Alert.alert(
          lang=="ENG"?"Warning":"Upozornenie",
          lang=="ENG"?"You alreade chose maximum number of Ingredients (5).":"Už ste si vybrali maximálny počet ingrediencií (5).",
          [
            {
              text:"OK",
            }
          ]
        )
      }
      else if(category==2 && repeat2<2){
        mix=mix+" "+name+",";
        finalprice=finalprice+price
        console.log("mix: ",mix,"finalprice: ",finalprice);
        repeat2=repeat2+1;
        ToastAndroid.show(repeat2+"/2 Toppings",ToastAndroid.SHORT);
      }
      else if(category==2 && repeat2==2){
        Alert.alert(
          lang=="ENG"?"Warning":"Upozornenie",
          lang=="ENG"?"You alreade chose maximum number of toppings (2).":"Už ste si vybrali maximálny počet ingrediencií na vrch (2).",
          [
            {
              text:"OK",
            }
          ]
        )
      }
    }
  };

  var returntoMix="false"

  const orderLogic=function(){
    if(finalprice==0){
      Alert.alert(
        lang=="ENG"?"Warning":"Varovanie",
        lang=="ENG"?"No Ingredients were chosen.":"Neboli vybrané žiadne ingrediencie",
        [
          {
          text:"OK",
          },
        ]
      )
    }
    else{
      finalprice=Number((finalprice).toFixed(2))
      Alert.alert(
        "Mix",
        lang=="ENG"?"Your mix is: "+mix+" for the price of "+finalprice+" €."+" Do you wish to order?":"Váš Mix je: "+mix+" za cenu "+finalprice+" €. "+"Želáte si objednať?",
        [
          {
          text: lang=="ENG"?"Yes":"Áno",
          onPress:function(){
            returntoMix="true",
            Order();
          },
          },
          {
          text: lang=="ENG"?"No":"Nie",
          },
          {
          text: lang=="ENG"?"Clear all Ingredients":"Zmaž všetky Ingrediencie",
            onPress:function(){
              mixLogic("","",0);
              ToastAndroid.show(lang=="ENG"?"Ingredients Cleared (0/5)":"Ingrediencie zmazané (0/5)",ToastAndroid.SHORT);
            }
          }
        ]
      )
    }
  };

  const WelcomeScreen=(
    <View style={mstyle}>
      <View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',width:widthSCRN+20,position:'absolute',top:0}}><Text style={{color:'white',fontSize:11,fontWeight:'bold'}}>{"\n"}</Text></View>
      <Text style={tstyle2}>{lang=="ENG"? "Welcome to our shop app, please choose your prefered language and view mode." : "Vitajte v našej aplikácií obchodu, prosím vyberte si preferovaný jazyk a mód zobrazenia."}</Text>
      <Text style={tstyle2}>{"\n"}{lang=="ENG"? "Language:" : "Jazyk:"}</Text>
      <Pressable onPress={ChooseENG}><Image source={require('./assets/ENG.jpg')} style={{width:150,height:90}}></Image></Pressable>
      <Pressable onPress={ChooseSK}><Image source={require('./assets/SK.png')} style={{width:150,height:90,marginTop:20}}></Image></Pressable>
      <Text style={tstyle2}>{"\n"}{lang=="ENG"? "View Mode:" : "Mód Zobrazenia:"}</Text>
      <Pressable onPress={PressLightMode}><Image source={require('./assets/sun.png')} style={{width:50,height:50}}></Image></Pressable>
      <Pressable onPress={PressNightMode}><Image source={require('./assets/moon.png')} style={{width:50,height:50}}></Image></Pressable>
      <Text></Text>
      <TouchableOpacity onPress={VibeCheck}><View style = {{backgroundColor:Mode=="light"?'#0488c9':'#032973',alignItems:'center',justifyContent:'center',borderRadius:100,width:300}}><Text style={{color:'white',fontSize:30,fontWeight:'bold'}}>{lang=="ENG"? "Continue" : "Pokračovať"}</Text></View></TouchableOpacity>
    </View>
  );


/*------------------------------------------------------------*/
  return current==='Home'? WelcomeScreen:current;
}

/*------------------- styles ----------------------*/

const styles = StyleSheet.create({
  light: {
    flex: 1,backgroundColor: '#d4dfff',alignItems: 'center',justifyContent: 'center',
  },

  lightText:{
    marginLeft:'1%',color:'#000',
  },

  lightText2:{
    marginLeft:'1%',color:'#000', fontWeight:'bold', fontSize:20,
  },

  lightTextMini:{
    color:'#000', fontSize:10,
  },

  lightShop:{
    flex:1,marginTop:'7%',backgroundColor: '#d4dfff'
  },
  // -------------- night ------------------------*/
  night: {
    flex: 1,backgroundColor: '#000',alignItems: 'center',justifyContent: 'center',
  },

  nightText:{
    marginLeft:'1%',color:'#fff',
  },

  nightText2:{
    marginLeft:'1%',color:'#fff',fontWeight:'bold', fontSize:20,
  },

  NightTextMini:{
    color:'#fff', fontSize:10,
  },

  nightShop:{
    flex:1,marginTop:30,backgroundColor: '#000'
  },
 // -----------------------------------------------*/
  image: {
    flex: 1,resizeMode: "cover",justifyContent: "center",
  },

  text: {
    color: "white",fontSize: 42,fontWeight: "bold",textAlign: "center",backgroundColor: "#000000a0"
  },

  container: {
    flex: 1,flexDirection: "column",
  },
});
