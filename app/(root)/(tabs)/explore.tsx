import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Card } from "@/components/Cards";

const explore = () => {
  return (
    <ScrollView>
      <View className="w-96 justify-center items-center mx-6 mt-5 mb-32">
        <Text>explore</Text>
        <Card />
      </View>
    </ScrollView>
  );
};

export default explore;
