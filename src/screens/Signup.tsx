import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { signup } from "../services/signupService";
import { login } from "../services/loginService";
import { createProfile } from "../services/fetchProfileService";
import { ICreateProfile } from "../intefarces/profile.interface";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";

export default function Signup(): JSX.Element {
	const [expoPushToken, setExpoPushToken] = useState("");
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const [notification, setNotification] = useState(false);
	const navigator = useNavigation();
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	async function handleCallNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Bem vindo ao Match Job",
				body: "Ficamos Felizes por estar Aqui!",
			},
			trigger: {
				seconds: 5,
			},
		});
	}

	async function registerForPushNotifications() {
		try {
			const token = await registerForPushNotificationsAsync();
			if (token == null) {
				console.error("Ops");
				return;
			}
			setExpoPushToken(token);
		} catch (error) {
			console.error("Erro ao registrar notificações:", error);
		}
	}

	useEffect(() => {
		registerForPushNotifications();

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(true);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {});

		return () => {
			if (notificationListener.current !== undefined) {
				Notifications.removeNotificationSubscription(
					notificationListener.current
				);
			}

			if (responseListener.current !== undefined) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	});

	async function handleSignup() {
		const userData: ISignupData = {
			name,
			email,
			password,
		};
		await signup(userData);
		const loginData = await login({ email, password });
		const creatProfielData: ICreateProfile = {
			userId: loginData.userId,
			name: userData.name,
		};
		await createProfile(creatProfielData, loginData.token);
		await handleCallNotification();
		navigator.navigate("Main");
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
							className="border border-gray-300 rounded-lg p-2 text-2xl font-extralight"
							onChangeText={(text) => setName(text)}
							value={name}
						/>
					</View>
					<View>
						{/* Ícone de Email */}
						<TextInput
							placeholder="E-mail"
							className="border border-gray-300 rounded-lg p-2 text-2xl font-extralight"
							textContentType="emailAddress"
							onChangeText={(text) => setEmail(text)}
							value={email}
						/>
					</View>
					<View>
						{/* Ícone de cadeado */}
						<TextInput
							placeholder="Senha"
							className="border border-gray-300 rounded-lg p-2 text-2xl font-extralight"
							onChangeText={(text) => setPassword(text)}
							value={password}
						/>
						{/* Ícone de olho */}
					</View>
					<View className="p-4"></View>
					<View>
						<TouchableOpacity
							className="flex items-center justify-center bg-purple rounded-md p-4"
							onPress={handleSignup}>
							<Text className="font-bold text-3xl text-white">Cadastrar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
