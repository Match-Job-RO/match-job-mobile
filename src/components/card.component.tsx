import React, { useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { IPostCard, IPostType } from "../intefarces/post.interface";
export default function CardComponent(post: Readonly<IPostCard>) {
	return (
		<SafeAreaView>
			<View className="bg-white rounded-lg shadow p-6 my-4 mx-2">
				{post.postType == IPostType.Service ? (
					<Text className="font-light text-purple-600">
						{post.user} publicou um serviço:
					</Text>
				) : (
					<Text className="font-light text-purple-600">
						{post.user} está contratando um serviço:
					</Text>
				)}
				<Text className="text-lg font-bold py-2">{post.title}</Text>
				<Text className="text-base text-justify">{post.content}</Text>
				{post.phone != undefined && (
					<Text className="font-light text-sm text-purple-600 py-2">
						Entre em contato pelo seguinte número: {post.phone}
					</Text>
				)}
			</View>
		</SafeAreaView>
	);
}
