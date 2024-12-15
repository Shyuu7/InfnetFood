import {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FoodCard from '../components/FoodCard';
import { Ionicons } from '@expo/vector-icons';
import CartIcon from '../components/CartIcon';
import { mockProducts } from '../constants/mockProducts';


const ProductsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { categoryId, categoryTitle } = route.params;
  const categoryProducts = mockProducts[categoryId] || [];
  
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{categoryTitle}</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <CartIcon 
          items={cartItems}
          showModal={showModal}
          setShowModal={setShowModal}
          style={styles.cartIcon}
          navigation={navigation}
        />
      </View>
      <FlatList
        data={categoryProducts}
        renderItem={({ item }) => (
          <FoodCard 
            {...item} 
            showPrice 
            onAddToCart={handleAddToCart}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkRed,
  },
  
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.goldenYellow,
    padding: 15,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    zIndex: 1,
  },

  cartIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
  },

  listContainer: {
    padding: 16,
  },
});

export default ProductsScreen;