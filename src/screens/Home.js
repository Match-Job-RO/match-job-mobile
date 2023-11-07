import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";

export default function Home({ route, navigation }) {
  const paramData = route.params.data;
  const [profile, setProfile] = useState({ name: "", posts: {} });
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);
  
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
  };

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
    registerForPushNotificationsAsync().then(token => {
      if (token == null) {
        console.error("Ops");
        return;
      }
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(true);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current !== undefined) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }

      if (responseListener.current !== undefined) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  });

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
          onPress={handleCallNotification}
        />
      </View>
    </View>
  );
}
