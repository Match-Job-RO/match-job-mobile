import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/loginService";

export default function Login() {
    const navgation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const userData = {
            email,
            password
        }
        const data = await login(userData);
        navgation.navigate("Home", { data });
    }
    
    return (
        <View className="mx-auto">
            <View className="mx-auto mt-16 p-8 text-center">
                <Text className="text-black text-4xl font-normal font-['Comfortaa']" >Login</Text>
            </View>

            <View className="p-4">
                <Text className="text-black text-xl font-normal font-['Offside']" >Bem Vindo ao Match Job-RO</Text>
            </View>

            <View>
                <View className="p-4">
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        className="border-2 border-black mt-2 p-1 px-2 rounded-md"
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
                <Button
                    title="Entrar"
                    onPress={handleLogin}
                />
            </View>
        </View>
    )
}