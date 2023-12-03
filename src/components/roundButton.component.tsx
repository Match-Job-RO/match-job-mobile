import React, { ReactElement, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

export default function RoundButton(): ReactElement<any, any> {
	const [isOpen, setIsOpen] = useState(false);

	const handlePress = () => {
		setIsOpen(!isOpen);
	};

	const handleContratarServico = () => {
		// Adicione a lógica para navegar para a tela de contratar serviço
		console.log("Contratar Serviço clicado");
	};

	const handlePublicarServico = () => {
		// Adicione a lógica para navegar para a tela de publicar serviço
		console.log("Publicar Serviço clicado");
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
