import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/Colors';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: COLORS.goldenYellow }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Tema
        </Text>
        <TouchableOpacity 
          style={[styles.settingItem, { backgroundColor: colors.containerBg }]}
          onPress={toggleTheme}
        >
          <View style={styles.settingInfo}>
            <Ionicons 
              name={isDark ? "moon" : "sunny"} 
              size={24} 
              color={COLORS.goldenYellow} 
            />
            <Text style={[styles.settingText, { color: colors.textColor }]}>
              {isDark ? 'Modo Escuro' : 'Modo Claro'}
            </Text>
          </View>
          <View style={[
            styles.toggle,
            isDark && styles.toggleActive
          ]} />
        </TouchableOpacity>
      </View>
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

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    marginBottom: 15,
    color: COLORS.white,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.goldenYellow,
  },

  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingText: {
    fontSize: 16,
    marginLeft: 10,
  },

  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#666',
    padding: 2,
    position: 'relative',
  },

  toggleActive: {
    backgroundColor: COLORS.goldenYellow,
  }

});

export default SettingsScreen;