import React, { useEffect, useRef, useState } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Button,
	SafeAreaView,
} from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ILoginResponse } from "../intefarces/login.interface";
import { IUserData } from "../intefarces/user.interface";
import { IProfile } from "../intefarces/profile.interface";
import { ScrollView } from "react-native-gesture-handler";
import CardComponent from "../components/card.component";

export default function Home() {
	const navigation = useNavigation();
	const [profile, setProfile] = useState({} as IProfile);
	const [expoPushToken, setExpoPushToken] = useState("");
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const [notification, setNotification] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState("");
	const [userId, setUserId] = useState<number>();

	async function getLocalStorageItem(): Promise<ILoginResponse> {
		const jsonValue = await AsyncStorage.getItem("loginData");

		if (jsonValue == null) {
			navigation.navigate("Login");
		}

		const data: ILoginResponse = JSON.parse(jsonValue!);
		return data;
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

	async function fetchUserData() {
		try {
			const loginData = await getLocalStorageItem();
			const userData: IUserData = await getUserById(
				loginData.userId,
				loginData.token
			);

			return userData;
		} catch (error) {
			console.log(error);

			navigation.navigate("Login");
		}
	}

	async function fetchAndSetProfile() {
		const loginData = await getLocalStorageItem();
		const userData: IUserData = await fetchUserData();
		try {
			const profileData: IProfile = await getProfileById(
				userData.profiles.id!,
				loginData.token
			);

			setProfile(profileData);
			setIsLoading(false);
		} catch (error) {
			console.error("Nenhum perfil cadastrado");
		}
	}

	useEffect(() => {
		fetchAndSetProfile();
		registerForPushNotifications();

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(true);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

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
	}, []);

	const openMap = () => {
		navigation.navigate("Map");
	};

	if (isLoading) return <Text>Loading...</Text>;

	console.log(profile);

	return (
		<ScrollView>
			<SafeAreaView className="p-16">
				<View className="flex justify-center items-center py-16">
					<View className="mb-8">
						<Text className="font-light text-4xl text-purple">MATCH JOB</Text>
					</View>
					{profile.posts.length > 0 ? (
						profile.posts.map((post) => (
							<CardComponent
								key={post.id}
								user={profile.user.name}
								title={post.title}
								content={post.content}
							/>
						))
					) : (
						<Text className="text-lg font-bold">Nenhum post encontrado</Text>
					)}
					<View>
						<Button
							title="Chamar notificação"
							onPress={handleCallNotification}
						/>

						<TouchableOpacity onPress={openMap}>
							<Text className="bg-blue-500 p-2 mt-2text-white">Abrir Mapa</Text>
						</TouchableOpacity>
					</View>

					{/* <BottomNavgator /> */}
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
