import React, { useEffect, useState } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
} from "react-native";
import { ILoginResponse } from "../intefarces/login.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
	getProfileByUserId,
	updateProfile,
} from "../services/fetchProfileService";
import { IProfile } from "../intefarces/profile.interface";
import Toast from "react-native-root-toast";

export default function Profile() {
	const navigation = useNavigation();
	const [profile, setProfile] = useState<IProfile>({} as IProfile);
	const [bio, setBio] = useState("");
	const [phone, setPhone] = useState("");

	async function getLocalStorageItem(): Promise<ILoginResponse> {
		const jsonValue = await AsyncStorage.getItem("loginData");

		if (jsonValue == null) {
			navigation.navigate("Auth");
		}

		const data: ILoginResponse = JSON.parse(jsonValue!);
		return data;
	}

	async function getProfile() {
		const userData = await getLocalStorageItem();
		const profileData = await getProfileByUserId(
			userData.userId,
			userData.token
		);

		setBio(profileData.bio);
		setPhone(profileData.phone);
		setProfile(profileData);
	}

	async function handleUpdate() {
		const userData = await getLocalStorageItem();

		profile.bio = bio;
		profile.phone = phone;
		await updateProfile(profile, userData.token);
		Toast.show("Perfil atualizado com sucesso!", {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 0,
		});
		navigation.navigate("Home");
	}

	useEffect(() => {
		getProfile();
	}, [profile.bio, profile.phone]);

	return (
		<ScrollView>
			<SafeAreaView className="p-16 h-full">
				<View className="flex justify-center items-center py-16">
					<View className="p-4">
						<Text className="font-light text-center text-4xl text-purple p-4">
							Olá {profile.user?.name}
						</Text>
						<Text className="font-light text-sm text-center text-purple p-4">
							Complete os dados de seu perfil
						</Text>
					</View>
					<View className="gap-8">
						<View>
							<Text className="text-purple text-xl p-2">Bio</Text>
							<TextInput
								className="border w-64 border-gray-300 rounded-lg
									 p-2 mb-4"
								placeholder="bio"
								value={bio}
								onChangeText={setBio}
							/>
						</View>
						<View>
							<Text className="text-purple text-xl p-2">Telefone</Text>
							<TextInput
								className="border w-64 border-gray-300 rounded-lg
									 p-2 mb-4"
								keyboardType="numeric"
								placeholder="Telefone"
								textContentType="telephoneNumber"
								value={phone}
								onChangeText={setPhone}
							/>
						</View>
					</View>
					<TouchableOpacity
						className="flex items-center justify-center bg-purple rounded-md p-4"
						onPress={handleUpdate}>
						<Text className="font-bold w-32 text-center text-xl text-white">
							Salvar
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
}
