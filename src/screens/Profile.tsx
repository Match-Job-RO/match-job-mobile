import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { IUserData } from "../intefarces/user.interface";

export default function Profile() {
  const [name, setName] = useState<IUserData>("");
  const [image, setImage] = useState<string>("");
  const [genre, setGenre] = useState<string>("");

  const handleOrder = () => {};

  return (
    <ScrollView>
      <SafeAreaView className="p-16 h-full">
        <View className="flex justify-center items-center py-16">
          <View className="mb-8">
            <Text className="font-light text-4xl text-purple p-4">
              OLÁ {name}
            </Text>
          </View>
          <Button title="Meus Pedidos" onPress={handleOrder} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
