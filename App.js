import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { initializeNotifications } from './utils/NotificationHelper';


const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <ThemeProvider>
    <NavigationContainer>
      {!isAuthenticated ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            initialParams={{ setIsAuthenticated }}
          />
        </Stack.Navigator>
      ) : (
        <TabNavigator setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
    </ThemeProvider>
  );
}