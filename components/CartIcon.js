import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';
import CartModal from './CartModal';

const CartIcon = ({ items = [], showModal, setShowModal, navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [totalItems, setTotalItems] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setTotalItems(newTotal);

    if (newTotal > prevTotal) {
      scaleAnim.setValue(1.5);
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true
        })
      ]).start();
    }
    setPrevTotal(newTotal);

    if (newTotal === 0) {
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true
      }).start();
    } else if (newTotal === 1 && prevTotal === 0) {
      opacityAnim.setValue(0);
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [items]);

  return (
    <>
      <TouchableOpacity 
        onPress={() => setShowModal(true)} 
        style={styles.container}
      >
        <Ionicons name="cart-outline" size={24} color="#fff" />
        <Animated.View 
          style={[
            styles.badge,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim
            }
          ]}
        >
          <Text style={styles.badgeText}>{totalItems}</Text>
        </Animated.View>
      </TouchableOpacity>

      <CartModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        items={items}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: COLORS.darkRed,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  }
});

export default CartIcon;