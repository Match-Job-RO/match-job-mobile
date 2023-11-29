import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { signup } from "../services/signupService";
import { login } from "../services/loginService";
import { createProfile } from "../services/fetchProfileService";

export default function Signup(): JSX.Element {
  const navigator = useNavigation();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignup() {
    const userData: ISignupData = {
      name,
      email,
      password,
    };
    await signup(userData);
    const loginData = await login({ email, password });
    await createProfile(loginData.userId, loginData.token);
    navigator.navigate("Home");
  }

  return (
    <ScrollView>
      <SafeAreaView className="p-16">
        <View className="flex justify-center items-center py-16">
          <View className="mb-8">
            <Text className="font-light text-6xl">Cadastro</Text>
          </View>
          <View>
            <Text className="font-extralight text-3xl">
              Bem Vindo ao Match Job-RO
            </Text>
          </View>
        </View>
        <View className="flex justify-center gap-10">
          <View>
            <TextInput
              placeholder="Nome"
              className="p-2 text-2xl font-extralight"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View>
            {/* Ícone de Email */}
            <TextInput
              placeholder="E-mail"
              className="p-2 text-2xl font-extralight"
              textContentType="emailAddress"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View>
            {/* Ícone de cadeado */}
            <TextInput
              placeholder="Senha"
              className="p-2 text-2xl font-extralight"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {/* Ícone de olho */}
          </View>
          <View className="p-4"></View>
          <View>
            <TouchableOpacity
              className="flex items-center justify-center bg-purple rounded-md p-4"
              onPress={handleSignup}
            >
              <Text className="font-bold text-3xl text-white">Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
