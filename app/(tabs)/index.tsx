import { Image } from 'expo-image';
import { ImageBackground, StyleSheet, View, Text, Platform } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getCurrentWeather } from '../../src/services/weather';
import * as Location from 'expo-location';
import { weatherConditions } from '../../src/weatherConditions';
import { backgrounds } from '../../src/backgrounds';



export default function HomeScreen() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState<string | null>(null);
  const [conditionIcon,setConditionIcon] = useState<string | null>(null);
  const [conditionCode, setConditionCode] = useState<number | null>(null);

  useEffect(() => {
    async function loadWeather() {
      let latitude = 40.7128;
      let longitude = -74.0060;
      
      const {status} = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted'){
        const location = await Location.getCurrentPositionAsync({});
        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }
      console.log('Using coordinates:', latitude, longitude);

      try {
        const data = await getCurrentWeather(latitude,longitude);
        console.log(data.data.values.weatherCode);
        const code = data.data.values.weatherCode;
        setConditionCode(code);
        const celsius = data.data.values.temperature;
        const fahrenheit = celsius * 9 / 5 + 32;
        setTemperature(fahrenheit);
        const conditionCode =data.data.values.weatherCode
        
        setCondition(weatherConditions[conditionCode]?.text ||"Unknown");
        setConditionIcon(weatherConditions[conditionCode]?.icon ||"❓");
      }
      catch (err){
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    }
    loadWeather();
    
}, []);
  const defaultImage = require('../../assets/images/default.png');
  const backgroundSource =
  (conditionCode!=null && backgrounds[conditionCode]) ||
  defaultImage;

  return (
    <ImageBackground
    source={backgroundSource} style={styles.background}>
    <View style={styles.overlay}>
      <ThemedText style={{color:'white', fontSize:24}} type="title">Hello, WeatherApp!</ThemedText>
      {loading && (<Text style={{color:'white'}}>Loading weather...</Text>)}
      {!loading && temperature !== null &&(
        <Text style = {styles.temp}>{Math.round(temperature)}°F</Text>)}
      {!loading && condition && (<Text style={styles.condition}>
        {conditionIcon} {condition}
      </Text>)}
    </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // dark overlay to make text visible
  },
  temp: {
    fontSize: 72,
    color: 'white',
    fontWeight: '300',
  },
  condition: {
    fontSize: 24,
    color: 'white',
    marginTop: 8,
  },
});