import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import { COLORS } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';

const FoodCard = ({ id, title, image, description, showPrice, price, onAddToCart, onPress }) => {
  const { colors } = useTheme();
  
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (!showPrice) {
      navigation.navigate('Products', {
        categoryId: id,
        categoryTitle: title
      });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.foodCard, { backgroundColor: colors.containerBg }]}>
      <Image source={image} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={[styles.foodTitle, { color: colors.textColor }]}>{title}</Text>
        <Text style={[styles.foodDescription, { color: colors.textColor }]}>{description}</Text>
        {showPrice && (
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={[styles.buyButton, { backgroundColor: colors.accents }]}
            onPress={() => onAddToCart && onAddToCart({ id, title, price, quantity: 1 })}
          >
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 15,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.goldenYellow
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.goldenYellow
  },

  foodInfo: {
    flex: 1,
    marginLeft: 15,
  },

  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    borderBottomColor: COLORS.goldenYellow,
    borderBottomWidth: 1,
  },

  foodDescription: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginTop: 5,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  buyButton: {
    backgroundColor: COLORS.darkRed,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },

  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  }
});

export default FoodCard;