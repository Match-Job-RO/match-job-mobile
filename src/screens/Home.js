import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { handleCallNotifications } from "../services/notificationsService";

export default function Home({ route, navigation }) {
  const paramData = route.params.data;
  const [profile, setProfile] = useState({ name: "", posts: {} });
  async function fetchProfile() {
    try {
      const userData = await getUserById(paramData.userId, paramData.token);
      console.log("userData:", userData);
      const profileData = await getProfileById(
        userData.profiles.id,
        paramData.token
      );
      console.log("profileData:", profileData);
      setProfile(profileData);
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleCreateService = () => {
    // Lógica para navegar para a tela de cadastro de serviço
    navigation.navigate("CadastroServico");
  };

  const handlePublishService = () => {
    // Lógica para navegar para a tela de publicação de serviço
    navigation.navigate("PublicarServico");
  };

  return (
    <View>
      <Text>Home</Text>
      <Text>{profile.name}</Text>
      <Text>{profile.posts?.title}</Text>
      <Text>{profile.posts?.content}</Text>

      <View>
        <TouchableOpacity onPress={handleCreateService}>
          <Text>Cadastrar Serviço</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePublishService}>
          <Text>Publicar Serviço</Text>
        </TouchableOpacity>
        <Button
          title="Chamar notificação"
          onPress={handleCallNotifications}
        />
      </View>
    </View>
  );
}
