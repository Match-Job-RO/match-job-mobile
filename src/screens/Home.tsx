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
import RoundButton from "../components/roundButton.component";
import { IPost } from "../intefarces/post.interface";
import { getPostList } from "../services/fetchPostService";

export default function Home() {
	const navigation = useNavigation();
	const [postList, setPostList] = useState({} as IPost[]);
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

	async function clearCache() {
		await AsyncStorage.clear();
		navigation.navigate("Login");
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

	async function fetchPosts() {
		const loginData = await getLocalStorageItem();
		try {
			const postList: IPost[] = await getPostList(loginData.token);

			setPostList(postList);
			setIsLoading(false);
		} catch (error) {
			console.error("Nenhum post encontrado");
		}
	}

	useEffect(() => {
		fetchPosts();
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

	return (
		<ScrollView>
			<SafeAreaView className="p-16 h-full">
				<View className="flex justify-center items-center py-16">
					<View className="mb-8">
						<Text className="font-light text-4xl text-purple">MATCH JOB</Text>
					</View>
					{postList.length > 0 ? (
						postList.map((post) => (
							<CardComponent
								postType={post.postType}
								key={post.id}
								user={post.profile.user.name}
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

						<TouchableOpacity onPress={clearCache}>
							<Text className="bg-blue-500 p-2 mt-2text-white">
								Limpar Cache
							</Text>
						</TouchableOpacity>
					</View>
					{/* <BottomNavgator /> */}
				</View>
				<RoundButton />
			</SafeAreaView>
		</ScrollView>
	);
}
