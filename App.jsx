
import {  Text, View, ImageBackground } from 'react-native';
import{s} from "./App.style"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { Input } from './components/input/input';
import {useEffect, useState} from "react";
import { DisplayTemperature } from './components/input/DisplayTemperature/DisplayTemperature';
import { UNITS, convertTemperature, getOppositeUnit, isIceTemperature } from './utils/temperature';
import { ButtonConvert } from './components/Buttons/ButtonConvert';
export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentUnit, setcurrentUnit] = useState("℃");
  const [currentBackgroud, setCurrentBackground] = useState(coldBackground)
  const oppositeUnit = getOppositeUnit (currentUnit);


  useEffect(() => {
    const isCold = isIceTemperature(inputValue, currentUnit)
   
      setCurrentBackground(isCold ?  coldBackground: hotBackground);

  

    

  
  }, [inputValue, currentUnit]);

  function getConvertedTemperature(){
    if (isNaN(inputValue)){
      return ""
    }else {
     return convertTemperature (
      inputValue,
      oppositeUnit
      ).toFixed(1)
    }

  }

  return (
    <ImageBackground style={s.backgroundImg} source={currentBackgroud}>
  <SafeAreaProvider>
    <SafeAreaView style={s.root}>
      <View style={s.workshop}>
        <DisplayTemperature  
        unit={oppositeUnit} temperature = {getConvertedTemperature()}
          
          />
        <Input unit={currentUnit} 
        onChange={setInputValue}
         defaultValue={0}
         />
        <ButtonConvert onPress={() =>{

          setcurrentUnit(oppositeUnit);

        }}  unit={currentUnit} />

      </View>

    </SafeAreaView>
  </SafeAreaProvider>
  </ImageBackground>

  );

   

  }
