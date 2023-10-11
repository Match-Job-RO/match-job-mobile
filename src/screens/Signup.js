import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../services/signupService";
import { login } from "../services/loginService";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Signup() {
  const navgation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const userData = {
      name,
      email,
      password,
    };
    const createdUserData = await signup(userData);
    const loginData = await login({ email, password});
    navgation.navigate("Home", { loginData });
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
            Cadastro
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
          <TextInput
            placeholder="Nome" 
            className="p-2 text-2xl font-extralight"
            onChangeText={setName}
            value={name}
          />
        </View>
        <View>
          {/* Icone de Email */}
          <TextInput
            placeholder="E-mail" 
            className="p-2 text-2xl font-extralight"
            textContentType="emailAddress"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View>
          {/* Icone de cadeado */}
          <TextInput
            placeholder="Senha"
            className="p-2 text-2xl font-extralight"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            />
            {/* Icone de olho */}
        </View>
        <View className="p-4">
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
  </SafeAreaView>  );
}
