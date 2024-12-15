import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import {useTheme} from '../contexts/ThemeContext';
import { sendOrderNotification } from '../utils/NotificationHelper';

const mockAddresses = [
  { id: '1', street: 'Rua das Flores, 123', district: 'Centro', city: 'Rio de Janeiro' },
  { id: '2', street: 'Rua São Clemente, 456', district: 'Botafogo', city: 'Rio de Janeiro' }
];

const mockPaymentMethods = [
  { id: '1', type: 'Cartão de Crédito', last4: '4242' },
  { id: '2', type: 'Pix' }
];

const CheckoutScreen = ({ route, navigation }) => {
  const {colors} = useTheme();
  const { items, total } = route.params;
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState(mockPaymentMethods[0].id);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const renderOrderItem = (item) => (
    <View key={item.id} style={styles.orderItem}>
      <View style={styles.orderItemInfo}>
        <Text style={[styles.orderItemTitle, {color: colors.textColor}]}>{item.title}</Text>
        <Text style={[styles.orderItemQuantity, {color: colors.textColor}]}>x{item.quantity}</Text>
      </View>
      <Text style={[styles.orderItemPrice, {color: colors.textColor}]}>
        R$ {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  const handleFinishOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      setError('Por favor, selecione endereço e forma de pagamento');
      return;
    }
  
    Alert.alert(
      'Pedido Confirmado!',
      'Seu pedido foi recebido e está sendo preparado.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
        }
      ]
    );
    
    sendOrderNotification('preparing');
    
    setTimeout(() => {
      sendOrderNotification('ready');
    }, 5000);
    
    setTimeout(() => {
      sendOrderNotification('delivering');
    }, 10000);

    setTimeout(() => {
      sendOrderNotification('delivered');
    }, 15000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finalizar Pedido</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seu Pedido</Text>
        <View style={[styles.orderList, {backgroundColor: colors.containerBg}]}>
          {items.map(renderOrderItem)}
          <View style={styles.orderTotal}>
            <Text style={[styles.orderTotalText, {color: colors.textColor}]}>Total</Text>
            <Text style={[styles.orderTotalPrice, {color: colors.textColor}]}>R$ {total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
        {mockAddresses.map(address => (
          <TouchableOpacity
            key={address.id}
            style={[
              styles.addressItem,
              selectedAddress === address.id && styles.selectedItem,
              {backgroundColor: colors.containerBg}
            ]}
            onPress={() => setSelectedAddress(address.id)}
          >
            <Ionicons 
              name={selectedAddress === address.id ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={colors.accents}
            />
            <View style={styles.addressInfo}>
              <Text style={[styles.addressText, {color: colors.textColor}]}>{address.street}</Text>
              <Text style={[styles.addressSubtext, {color: colors.textColor}]}>{address.district}, {address.city}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
        {mockPaymentMethods.map(method => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentItem,
              selectedPayment === method.id && styles.selectedItem,
              {backgroundColor: colors.containerBg}
            ]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <Ionicons 
              name={selectedPayment === method.id ? "radio-button-on" : "radio-button-off"} 
              size={24} 
              color={colors.accents}
            />
            <Text style={[styles.paymentText, {color: colors.textColor}]}>
              {method.type} {method.last4 ? `(**** ${method.last4})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Observações</Text>
        <TextInput
          style={[styles.input, {color: colors.textColor}, {backgroundColor: colors.containerBg}]}
          placeholder="Instruções especiais para entrega..."
          placeholderTextColor='#999'
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        style={styles.finishButton}
        onPress={handleFinishOrder}
      >
        <Text style={styles.finishButtonText}>
          Finalizar Pedido - R$ {total.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </ScrollView>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.goldenYellow,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 20,
  },

   orderList: {
    borderRadius: 10,
    padding: 15,
  },

  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  orderItemInfo: {
    flex: 1,
  },

  orderItemTitle: {
    fontSize: 16,
  },

  orderItemQuantity: {
    fontSize: 14,
    marginTop: 4,
  },

  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.goldenYellow,
  },

  orderTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  orderTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.goldenYellow,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 15,
  },

  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  selectedItem: {
    borderColor: COLORS.goldenYellow,
    borderWidth: 1,
  },

  addressInfo: {
    marginLeft: 10,
  },

  addressText: {
    fontSize: 16,
  },

  addressSubtext: {
    fontSize: 14,
  },

  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },

  input: {
    borderRadius: 10,
    padding: 15,
    color: COLORS.darkGray,
    textAlignVertical: 'top',
    minHeight: 100,
  },

  errorText: {
    color: COLORS.red,
    textAlign: 'center',
    marginTop: 10,
  },

  finishButton: {
    backgroundColor: COLORS.goldenYellow,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  
  finishButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;