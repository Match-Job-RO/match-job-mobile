import React, { ReactElement, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IPostType } from "../intefarces/post.interface";

export default function RoundButton(): ReactElement<any, any> {
	const [isOpen, setIsOpen] = useState(false);
	const navigation = useNavigation();
	const handlePress = () => {
		setIsOpen(!isOpen);
	};

	const handleContratarServico = () => {
		navigation.navigate("Post", { postType: IPostType.Job });
	};

	const handlePublicarServico = () => {
		navigation.navigate("Post", { postType: IPostType.Service });
	};

	return (
		<View className="items-center justify-center absolute bottom-0 right-0 p-4">
			{isOpen && (
				<View className="items-center">
					<TouchableOpacity
						className="bg-purple p-2 rounded mb-2"
						onPress={handleContratarServico}>
						<Text className="text-white text-center">Contratar Serviço</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className="bg-purple p-2 rounded mb-2"
						onPress={handlePublicarServico}>
						<Text className="text-white text-center">Publicar Serviço</Text>
					</TouchableOpacity>
				</View>
			)}
			<TouchableOpacity
				className="bg-purple w-16 h-16 rounded-full items-center justify-center mb-2 relative"
				onPress={handlePress}>
				<Text className="text-white text-2xl">+</Text>
			</TouchableOpacity>
		</View>
	);
}
