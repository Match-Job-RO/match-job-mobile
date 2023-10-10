import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../services/loginService";

export default function Login() {
  const navgation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const userData = {
      email,
      password,
    };
    const data = await login(userData);
    navgation.navigate("Home", { data });
  }

  return (
    <SafeAreaView
    className="p-16 "
    >
      <View
        className="flex justify-center items-center py-16"
      >
        <View
          className="mb-8"
        >
          <Text
            className="font-light text-6xl"
          >
            Login
          </Text>
        </View>
        <View>
          <Text
            className="font-extralight text-3xl"
          >
            Bem Vindo ao Match Job-RO
          </Text>
        </View>
      </View>
      <View
        className="flex justify-center gap-10"
      >
        <View>
          {/* Icone de Email */}
          <TextInput
            placeholder="E-mail" 
            className="p-2 text-2xl font-extralight"
            textContentType="emailAddress"
          />
        </View>
        <View>
          {/* Icone de cadeado */}
          <TextInput
            placeholder="Senha"
            className="p-2 text-2xl font-extralight"
            textContentType="password"
            />
            {/* Icone de olho */}
        </View>
        <View>
          <TouchableOpacity
            className="flex items-center justify-center bg-purple rounded-md p-4"
            onPress={() => handleLogin()}
          >
            <Text
              className="font-bold text-3xl text-white"
            >
              Entrar
            </Text>
          </TouchableOpacity> 
        </View>
      </View>
  </SafeAreaView>);
}
