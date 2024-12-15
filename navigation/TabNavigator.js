import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {HomeStack, ProfileStack, MapStack} from './StackNavigator'
import {COLORS} from "../constants/Colors";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ setIsAuthenticated }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mapa') {
            iconName = focused ? 'map' : 'map-outline';
          } else {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.goldenYellow,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Mapa" component={MapStack} />
      <Tab.Screen 
        name="Profile" 
        children={()=> <ProfileStack setIsAuthenticated={setIsAuthenticated} />}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;