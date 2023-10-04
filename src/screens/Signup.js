import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../services/signupService";

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
    const data = await signup(userData);
    navgation.navigate("Home", { data });
  }

  return (
    <View className="mx-auto">
      <View className="mx-auto mt-16 p-8 text-center">
        <Text className="text-black text-4xl font-normal font-['Comfortaa']">
          Signup
        </Text>
      </View>

      <View className="p-4">
        <Text className="text-black text-xl font-normal font-['Offside']">
          Bem Vindo ao Match Job-RO
        </Text>
      </View>

      <View>
        <View className="p-4">
          <Text>Nome</Text>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            className="border-2 border-black mt-2 p-1 px-2 rounded-md"
          />
        </View>

        <View className="p-4">
          <Text>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border-2 border-black p-1 px-2 rounded-md"
          />
        </View>

        <View className="p-4">
          <Text>Senha</Text>
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            className="border-2 border-black p-1 px-2 rounded-md"
            textContentType="password"
          />
        </View>
      </View>

      <View className="p-4">
        <Button title="Entrar" onPress={handleSignup} />
      </View>
    </View>
  );
}
