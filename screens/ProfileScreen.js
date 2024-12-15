import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "../constants/mockUser";
import { useTheme } from "../contexts/ThemeContext";

const ProfileScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { setIsAuthenticated } = route.params || {};

  const handleLogout = () => {
    if (typeof setIsAuthenticated === "function") {
      setIsAuthenticated(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.containerBg }]}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.containerBg }] }>
          <Ionicons
            name="person-circle"
            size={100}
            color={colors.accents}
          />
        </View>
        <Text style={[styles.name, { color: colors.textColor }]}>{mockUser.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <InfoItem icon="mail" label="Email" value={mockUser.email} themeColors={colors}/>
        <InfoItem icon="call" label="Telefone" value={mockUser.phone} themeColors={colors}/>
        <InfoItem icon="location" label="Endereço" value={mockUser.address} themeColors={colors}/>
      </View>
      <TouchableOpacity
        style={[styles.ordersButton, {backgroundColor: colors.containerBg}]}
        onPress={() => navigation.navigate("Orders")}
      >
        <Ionicons name="list" size={24} color={colors.accents} />
        <Text style={[styles.ordersButtonText, {color: colors.textColor}]}>Meus Pedidos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.ordersButton, { backgroundColor: colors.containerBg }]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color={colors.accents}
        />
        <Text style={[styles.ordersButtonText, {color: colors.textColor}]}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color={COLORS.darkRed} />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const InfoItem = ({ icon, label, value, themeColors }) => (
  <View style={[
    styles.infoItem, 
    { backgroundColor: themeColors.containerBg }
  ]}>
    <Ionicons name={icon} size={24} color={themeColors.accents} />
    <View style={styles.infoText}>
      <Text style={[styles.label, { color: themeColors.accents }]}>{label}</Text>
      <Text style={[styles.value, { color: themeColors.textColor }]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkRed,
  },

  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.goldenYellow,
  },

  avatarContainer: {
    marginVertical: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },

  infoContainer: {
    padding: 20,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 15,
  },

  label: {
    fontSize: 14,
  },

  value: {
    fontSize: 16,
    marginTop: 2,
  },

  ordersButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
  },

  ordersButtonText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.red,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },

  logoutButtonText: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
