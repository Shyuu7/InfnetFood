import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

const CartModal = ({ visible, onClose, items, navigation }) => {
  const { colors } = useTheme();

  const total = items && items.length > 0 
    ? items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    : 0;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <Text style={[styles.itemTitle, { color: colors.textColor }]}>{item.title}</Text>
        <Text style={[styles.itemQuantity, { color: colors.textColor }]}>x{item.quantity || 1}</Text>
        <Text style={[styles.itemPrice, { color: colors.textColor }]}>
          R$ {(item.price * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>
    );
  };

  const handleCheckout = () => {
    onClose();
    navigation.navigate('Checkout', { items, total });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.containerBg }]}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, {color: colors.textColor}]}>Carrinho</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.textColor} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={items || []}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Text style={[styles.emptyText, { color: colors.textColor }]}>Seu carrinho está vazio</Text>
            }
          />

          <View style={styles.footer}>
            <Text style={[styles.total, { color: colors.textColor }]}>Total: R$ {total.toFixed(2)}</Text>
            {items.length > 0 && (
              <TouchableOpacity 
                style={[styles.checkoutButton, { backgroundColor: colors.accents }]}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '50%',
    maxHeight: '80%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.goldenYellow,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  itemTitle: {
    flex: 1,
    fontSize: 16,
  },

  itemQuantity: {
    marginHorizontal: 10,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  checkoutButton: {
    backgroundColor: COLORS.darkRed,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.goldenYellow
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  emptyText: {
    textAlign: 'center',
    padding: 20,
    color: COLORS.darkGray,
  }
});

export default CartModal;