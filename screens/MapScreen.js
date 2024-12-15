import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';
import { mockRestaurants } from '../constants/mockRestaurants';
import { Ionicons } from '@expo/vector-icons';
import {useTheme} from '../contexts/ThemeContext';

const MapScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantPositions, setRestaurantPositions] = useState({});

  useEffect(() => {
    const positions = {};
    mockRestaurants.forEach(restaurant => {
      positions[restaurant.id] = {
        left: Math.random() * 70 + 15,
        top: Math.random() * 70 + 15,
      };
    });
    setRestaurantPositions(positions);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurantes Próximos</Text>
      </View>
      
      <View style={styles.mapContainer}>
        <Image 
          source={require('../assets/mock-map.jpg')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        {mockRestaurants.map(restaurant => (
          <TouchableOpacity
            key={restaurant.id}
            style={[
              styles.marker,
              {
                left: `${restaurantPositions[restaurant.id]?.left}%`,
                top: `${restaurantPositions[restaurant.id]?.top}%`
              },
            ]}
            onPress={() => setSelectedRestaurant(restaurant)}
          >
            <Ionicons name="location" size={34} color={COLORS.darkRed} />
          </TouchableOpacity>
        ))}
      </View>

      {selectedRestaurant && (
  <View style={[styles.restaurantCard, {backgroundColor: colors.containerBg}]}>
    <Text style={[styles.restaurantName, {color: colors.accents}]}>{selectedRestaurant.name}</Text>
    <Text style={[styles.restaurantInfo, {color: colors.textColor}]}>	
      {selectedRestaurant.cuisine} • {selectedRestaurant.rating} ⭐
    </Text>
    <Text style={[styles.restaurantAddress, {color: colors.textColor}]}>{selectedRestaurant.address}</Text>
    <TouchableOpacity 
      style={[styles.detailsButton, {backgroundColor: colors.accents}]}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: selectedRestaurant })}
    >
      <Text style={styles.detailsButtonText}>Ver detalhes</Text>
    </TouchableOpacity>
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkRed,
  },
  
  header: {
    backgroundColor: COLORS.goldenYellow,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  mapContainer: {
    flex: 1,
    position: 'relative',
  },

  mapImage: {
    width: '100%',
    height: '100%',
  },

  marker: {
    position: 'absolute',
    transform: [{ translateX: -12 }, { translateY: -24 }],
  },

  restaurantCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.goldenYellow,
  },

  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  restaurantInfo: {
    fontSize: 14,
    marginTop: 5,
  },

  restaurantAddress: {
    fontSize: 14,
    marginTop: 5,
  },

  detailsButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  
  detailsButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MapScreen;