import { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {useNavigation} from '@react-navigation/native'
import { COLORS } from "../constants/Colors";
import FoodCard from "../components/FoodCard";
import {categories} from "../constants/Categories"


const HomeScreen = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (item) => {
    navigation.navigate('Products', {
      categoryId: item.id,
      categoryTitle: item.title,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require("../assets/InfnetFood-no-bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>InfnetFood</Text>
          <Text style={styles.headerSubtitle}>
            Qual é o sabor do seu desejo hoje?
          </Text>
        </View>
      </View>

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <FoodCard 
            {...item} 
            onPress={() => handleCategoryPress(item)}
            testID="food-card"
          />
        )}
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
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.goldenYellow,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  logo: {
    width: 130,
    height: 130,
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: 'center'
  },

  headerSubtitle: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 5,
  },

  listContainer: {
    padding: 15,
  },
  
});

export default HomeScreen;
