import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'user_background';

export async function saveBackground(key:string) {
    await AsyncStorage.setItem(KEY,key);
}

export async function loadBackground():Promise<string|null> {
    return await AsyncStorage.getItem(KEY);
}

export async function clearBackground(){
    await AsyncStorage.removeItem(KEY);
}