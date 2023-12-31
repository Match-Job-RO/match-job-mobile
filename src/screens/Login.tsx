import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../services/loginService";
import Toast from "react-native-root-toast";

export default function Login() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleLogin() {
		const userData = {
			email,
			password,
		};
		await login(userData)
			.then((data) => {
				navigation.navigate("Main");
			})
			.catch(() => {
				Toast.show("Login inválido!", {
					duration: Toast.durations.LONG,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					delay: 0,
				});
			});
	}

	return (
		<ScrollView>
			<SafeAreaView className="p-16 ">
				<View className="flex justify-center items-center py-16">
					<View className="mb-8">
						<Text className="font-light text-6xl">Login</Text>
					</View>
					<View>
						<Text className="font-extralight text-3xl">
							Bem Vindo ao Match Job-RO
						</Text>
					</View>
				</View>
				<View className="flex justify-center gap-10">
					<View>
						{/* Icone de Email */}
						<TextInput
							placeholder="E-mail"
							className="p-2 border border-gray-300 rounded-lg text-2xl font-extralight"
							textContentType="emailAddress"
							onChangeText={setEmail}
							value={email}
						/>
					</View>
					<View>
						{/* Icone de cadeado */}
						<TextInput
							placeholder="Senha"
							className="border border-gray-300 rounded-lg p-2 text-2xl font-extralight"
							textContentType="password"
							onChangeText={setPassword}
							value={password}
						/>
						{/* Icone de olho */}
					</View>
					<View className="p-4">
						<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
							<Text className="text-purple font-light">Cadastre-se</Text>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity
							className="flex items-center justify-center bg-purple rounded-md p-4"
							onPress={handleLogin}>
							<Text className="font-bold text-3xl text-white">Entrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
