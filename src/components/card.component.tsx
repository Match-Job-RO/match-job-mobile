import { SafeAreaView, View, Text } from "react-native";
import { IPostCard } from "../intefarces/post.interface";
export default function CardComponent(post: IPostCard) {
	return (
		<SafeAreaView>
			<View className="bg-white rounded-lg shadow p-6 my-4 mx-2">
				<Text className="font-light text-purple-600">{post.user} postou:</Text>
				<Text className="text-lg font-bold py-2">{post.title}</Text>
				<Text className="text-base text-justify">{post.content}</Text>
			</View>
		</SafeAreaView>
	);
}
