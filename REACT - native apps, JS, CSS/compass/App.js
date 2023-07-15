import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const styles = StyleSheet.create({
  basic: {
    backgroundColor: '#000000',
    alignSelf: 'center',
    flex:1,
    flexDirection: 'column'
  },

  orient: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

export default App=()=>{

  const [subscription,setSubscription]=useState(null);
  const [magnetometer,setMagnetometer]=useState(0);

  useEffect(()=>{
    _toggle();
    return ()=>{
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    subscription = null;
  };

  const _angle = (magnetometer) => {
    if (magnetometer) {
      let {x,y,z} = magnetometer;
      if (Math.atan2(y,x)>=0){
        angle=Math.atan2(y,x)*(180/Math.PI);
      }
      else {
        angle=(Math.atan2(y,x)+2*Math.PI)*(180/Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _smer=(stupne)=>{
    if (stupne>=22.5 && stupne<67.5) {
      return 'Severovýchod';
    }
    else if (stupne>=67.5 && stupne<112.5) {
      return 'Východ';
    }
    else if (stupne>=112.5 && stupne<157.5) {
      return 'Juhovýchod';
    }
    else if (stupne>=157.5 && stupne<202.5) {
      return 'Juh';
    }
    else if (stupne>=202.5 && stupne<247.5) {
      return 'Juhozápad';
    }
    else if (stupne>=247.5 && stupne<292.5) {
      return 'Západ';
    }
    else if (stupne>=292.5 && stupne<337.5) {
      return 'Severozápad';
    }
    else {
      return 'Sever';
    }
  };

  const _stupne=(magnetometer)=>{
    return magnetometer-90>=0 ? magnetometer-90 : magnetometer+271};

  return (
  <View style={styles.basic}>
    <Text style={styles.orient}>{_smer(_stupne(magnetometer))}</Text>

    <Text style={{color: '#fff', fontSize: 30, alignSelf: 'center', marginTop:'10%', marginBottom:'10%'}}>{_stupne(magnetometer)}°</Text>

    <Image source={require("./assets/compass.png")} style={{
        height: 360,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        transform: [{rotate: 360-magnetometer+'deg'}]
       }}></Image>
    </View>
  );
}

