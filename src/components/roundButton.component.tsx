import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

const RoundButton = () => { 
						
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
        <View className="items-center justify-center">
        <TouchableOpacity
            className="bg-blue-500 w-16 h-16 rounded-full items-center justify-center mb-2"
            onPress={handlePress}
        >
            <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
        {isOpen && (
            <View className="items-center">
            <TouchableOpacity
                className="bg-blue-500 w-64 py-2 rounded mb-2"
                onPress={handleContratarServico}
            >
                <Text className="text-white">Contratar Serviço</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-blue-500 w-64 py-2 rounded mb-2"
                onPress={handlePublicarServico}
            >
                <Text className="text-white">Publicar Serviço</Text>
            </TouchableOpacity>
            </View>
        )}
        </View>
    );
    };

    export default RoundButton;