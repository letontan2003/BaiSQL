import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen_01 from './screens/Screen_01';
import Screen_02 from './screens/Screen_02';
import Screen_03 from './screens/Screen_03';
import Screen_04 from './screens/Screen_04';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen_01" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Screen_01" component={Screen_01} />
        <Stack.Screen name="Screen_02" component={Screen_02} />
        <Stack.Screen name="Screen_03" component={Screen_03} />
        <Stack.Screen name="Screen_04" component={Screen_04} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
