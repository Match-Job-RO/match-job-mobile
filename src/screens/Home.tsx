import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ILoginResponse } from "../intefarces/login.interface";
import { IUserData } from "../intefarces/user.interface";
import { IProfile } from "../intefarces/profile.interface";

export default function Home() {
	const navigation = useNavigation();
	const [profile, setProfile] = useState({} as IProfile);
	const [expoPushToken, setExpoPushToken] = useState("");
	const notificationListener = useRef<Notifications.Subscription>();
	const responseListener = useRef<Notifications.Subscription>();
	const [notification, setNotification] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function getLocalStorageItem(): Promise<ILoginResponse> {
		const jsonValue = await AsyncStorage.getItem("loginData");
		if (jsonValue == null) {
			navigation.navigate("Login");
		}
		const data: ILoginResponse = JSON.parse(jsonValue!);
		console.log(data);
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

	async function fetchAndSetProfile() {
		const loginData: ILoginResponse = await getLocalStorageItem();
		try {
			const userData: IUserData = await getUserById(
				loginData.userId,
				loginData.token
			);
			console.log(userData);

			const profileData: IProfile = await getProfileById(
				userData.profiles.id,
				loginData.token
			);
			setProfile(profileData);
			setIsLoading(false);
			await AsyncStorage.clear();
		} catch (error) {
			navigation.navigate("Login");
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
		<View>
			<View>
				<Text>Home</Text>
				<Text>{profile?.name}</Text>
				<Text>{profile?.posts[0]?.title}</Text>
				<Text>{profile?.posts[0]?.content}</Text>
			</View>
			<View>
				<Button title="Chamar notificação" onPress={handleCallNotification} />

				<TouchableOpacity onPress={openMap}>
					<Text>Abrir Mapa</Text>
				</TouchableOpacity>
			</View>
			{/* <BottomNavgator /> */}
		</View>
	);
}
