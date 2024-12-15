import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Colors";
import { mockOrders } from "../constants/mockOrders";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

const OrdersScreen = ({navigation}) => {
  const {colors} = useTheme();

  const renderOrderItem = ({ item }) => (
    <View style={[styles.orderCard, {backgroundColor: colors.containerBg}]}>
      <View style={styles.orderHeader}>
        <Text style={[styles.orderDate, {color: colors.accents}]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text
          style={[
            styles.orderStatus,
            {
              color:
                item.status === "Entregue" ? colors.accents : COLORS.red,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>

      <View style={styles.itemsList}>
        {item.items.map((orderItem) => (
          <View key={orderItem.id} style={styles.orderItem}>
            <Text style={[styles.itemTitle, {color: colors.textColor}]}>
              {orderItem.quantity}x {orderItem.title}
            </Text>
            <Text style={[styles.itemPrice, {color: colors.textColor}]}>
              R$ {(orderItem.price * orderItem.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={[styles.totalText, {color:colors.textColor}]}>Total:</Text>
        <Text style={[styles.totalAmount, {color: colors.accents}]}>R$ {item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pedidos</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: COLORS.goldenYellow,
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
  },

  backButton: {
    position: 'absolute',
    left: 20,
    bottom: 15,
    zIndex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },

  listContainer: {
    padding: 16,
  },

  orderCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.goldenYellow,
  },

  orderDate: {
    fontSize: 16,
  },

  orderStatus: {
    fontWeight: "bold",
    fontSize: 16,
  },

  itemsList: {
    marginBottom: 15,
  },

  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  itemTitle: {
    fontSize: 16,
  },

  itemPrice: {
    fontSize: 16,
  },

  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.goldenYellow,
    paddingTop: 10,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrdersScreen;
