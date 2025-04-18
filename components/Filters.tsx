import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategoryPress = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item.category)}
          key={index}
          style={[
            styles.categoryButton,
            selectedCategory === item.category
              ? styles.selectedButton
              : styles.unselectedButton,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.category
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 12,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  selectedButton: {
    backgroundColor: "#00C2A8", // Assuming primary-300 is this color - adjust as needed
  },
  unselectedButton: {
    backgroundColor: "#00C2A80A", // Assuming primary-100 is this color - adjust as needed
    borderWidth: 1,
    borderColor: "#00C2A81A", // Assuming primary-200 is this color - adjust as needed
  },
  categoryText: {
    fontSize: 14,
  },
  selectedText: {
    color: "#FFFFFF",
    fontFamily: "Rubik-Regular",
    marginTop: 2,
  },
  unselectedText: {
    color: "#191D31", // Assuming text-black-300 is this color - adjust as needed
    fontFamily: "Rubik-Regular",
  },
});

export default Filters;
