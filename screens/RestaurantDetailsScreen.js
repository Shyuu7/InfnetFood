import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import {useTheme} from '../contexts/ThemeContext';

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const {colors} = useTheme();
  const { restaurant } = route.params;

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Dados do restaurante não disponíveis</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
      </TouchableOpacity>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Ionicons name="star" size={16} color={COLORS.darkRed} />
        </View>
      </View>

      <View style={[styles.infoContainer, {backgroundColor: colors.containerBg}]}>
        <View style={styles.infoRow}>
          <Ionicons name="restaurant" size={20} color={colors.accents} />
          <Text style={[styles.cuisine, {color: colors.textColor}]}>{restaurant.cuisine}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={colors.accents} />
          <Text style={[styles.address, {color: colors.textColor}]}>{restaurant.address}</Text>
        </View>
      </View>

      {restaurant.featuredDish && (
        <View style={styles.featuredContainer}>
          <Text style={styles.featuredTitle}>Item mais vendido</Text>
          <View style={[styles.featuredCard, {backgroundColor: colors.containerBg}]}>
            <Image 
              source={restaurant.featuredDish.image} 
              style={styles.itemImage}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, {color: colors.accents}]}>{restaurant.featuredDish.title}</Text>
              <Text style={[styles.itemDescription, {color: colors.textColor}]}>
                {restaurant.featuredDish.description}
              </Text>
              <Text style={[styles.itemPrice, {color: colors.accents}]}>
                R$ {restaurant.featuredDish.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
    marginLeft: 30,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rating: {
    color: COLORS.white,
    fontSize: 16,
    marginRight: 5,
  },

  infoContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginTop: 1,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  cuisine: {
    marginLeft: 10,
    fontSize: 16,
  },

  address: {
    marginLeft: 10,
    fontSize: 16,
  },

  featuredContainer: {
    padding: 20,
  },

  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 15,
  },

  featuredCard: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.goldenYellow,
  },

  itemImage: {
    width: '100%',
    height: 200,
  },

  itemInfo: {
    padding: 15,
  },

  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  itemDescription: {
    marginTop: 5,
    fontSize: 14,
  },

  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

});

export default RestaurantDetailsScreen;