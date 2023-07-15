import React from 'react'
import {TouchableOpacity} from 'react-native'


const Marker = ({onPress, top, left}) => (
    <TouchableOpacity onPress={onPress} style={{height: 10, width: 10, borderRadius: 5, backgroundColor: 'red', position: 'absolute', top, left}} />
)

export default Marker