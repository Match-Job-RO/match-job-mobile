import React, { useEffect, useRef, useState } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Button,
	SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ILoginResponse } from "../intefarces/login.interface";
import { ScrollView } from "react-native-gesture-handler";
import CardComponent from "../components/card.component";
import RoundButton from "../components/roundButton.component";
import { IPost } from "../intefarces/post.interface";
import { getPostList } from "../services/fetchPostService";

export default function Home() {
	const navigation = useNavigation();
	const [postList, setPostList] = useState({} as IPost[]);
	const [isLoading, setIsLoading] = useState(true);

	async function getLocalStorageItem(): Promise<ILoginResponse> {
		const jsonValue = await AsyncStorage.getItem("loginData");

		if (jsonValue == null) {
			navigation.navigate("Auth");
		}

		const data: ILoginResponse = JSON.parse(jsonValue!);
		return data;
	}

	async function clearCache() {
		await AsyncStorage.clear();
		navigation.navigate("Auth");
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
								user={post.profile!.user!.name}
								phone={post.profile!.phone}
								title={post.title}
								content={post.content}
							/>
						))
					) : (
						<Text className="text-lg font-bold">Nenhum post encontrado</Text>
					)}
					<View>
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
