import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView } from "react-native";
import { IPostRequest, IPostType } from "../intefarces/post.interface";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginResponse } from "../intefarces/login.interface";
import { useNavigation } from "@react-navigation/native";
import { createPost } from "../services/fetchPostService";
import { IProfile } from "../intefarces/profile.interface";

export default function Post({ route }) {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const postType = route.params.postType;
	const navigation = useNavigation();

	async function getLocalStorageItem(): Promise<IPostRequest> {
		const jsonValue = await AsyncStorage.getItem("profileData");
		const userJsonValue = await AsyncStorage.getItem("loginData");

		if (jsonValue == null) {
			navigation.navigate("Login");
		}

		const data: IProfile = JSON.parse(jsonValue!);
		const userData: ILoginResponse = JSON.parse(userJsonValue!);

		console.log(userData);

		return { profileId: data.id, token: userData.token };
	}
	async function handlePublish() {
		const profileData = await getLocalStorageItem();
		console.log(profileData);

		const postData = {
			title: title,
			content: content,
			postType: postType,
			profileId: profileData.profileId,
		};
		console.log(postData);

		const createdPost = await createPost(postData, profileData.token);
		console.log(createdPost);

		navigation.navigate("Main");
	}

	return (
		<ScrollView>
			<SafeAreaView className="p-16 h-full">
				<View className="flex justify-center items-center py-16">
					<View className="mb-8">
						{postType == IPostType.Job ? (
							<View className="p-4">
								<Text className="font-light text-4xl text-purple text-center">
									CONTRATAR SERVIÇO
								</Text>

								<Text className="font-light text-sm text-center text-purple p-4">
									Encontre a pessoa certa para transformar seu projeto em
									realidade
								</Text>
							</View>
						) : (
							<View className="p-4">
								<Text className="font-light text-4xl text-purple text-center">
									PUBLICAR SERVIÇO
								</Text>

								<Text className="font-light text-sm text-center text-purple p-4">
									Compartilhe seu talento e faça a diferença
								</Text>
							</View>
						)}
						<View className="gap-8">
							<View>
								<Text className="text-purple text-xl p-2">Título</Text>
								<TextInput
									className="border border-gray-300 rounded-lg
									 p-2 mb-4"
									placeholder="Título"
									value={title}
									onChangeText={setTitle}
								/>
							</View>
							<View>
								<Text className="text-purple text-xl p-2">Conteúdo</Text>
								<TextInput
									multiline
									numberOfLines={15}
									className="border max-h-96 border-gray-300 rounded-lg p-2 mb-4"
									value={content}
									textAlignVertical="top"
									onChangeText={setContent}
								/>
							</View>
						</View>
						<View>
							<TouchableOpacity
								className="flex mx-auto w-64 items-center justify-center bg-purple rounded-md p-4"
								onPress={handlePublish}>
								<Text className="font-bold text-xl text-white">Publicar</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
