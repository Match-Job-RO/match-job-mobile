import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";

export default function Home({ route, navigation }) {
  const paramData = route.params.data;
  console.log("PARAMDATA:", paramData);
  const [profile, setProfile] = useState({ name: "", posts: {} });
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);
  const [isLoading, setLoading] = useState(true);

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
  }

  async function fetchProfile() {
    console.log(paramData?.userId);
    try {
      console.log("-----------DADOS DO CARALHO-----------");
      console.log("");
      console.log(paramData.userId, paramData.token);
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log("-----------FIM DADOS DO CARALHO-----------");

      const userData = await getUserById(paramData.userId, paramData.token);
      console.log("userData:", userData);
      const profileData = await getProfileById(
        userData.profiles.id,
        paramData.token
      );
      console.log("profileData:", profileData);
      return profileData;
    } catch (error) {
      console.error("Erro ao buscar dados do perfil:", error);
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token == null) {
        console.error("Ops");
        return;
      }
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(true);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    if (isLoading) {
      fetchProfile().then((profileData) => {
        setProfile(profileData);
        setLoading(false);
      });
    }

    return () => {
      if (notificationListener.current !== undefined) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
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

  const openMap = () => {
    navigation.navigate("Map");
  };

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <View>
      <View>
        <Text>Home</Text>
        <Text>{profile?.name}</Text>
        <Text>{profile.posts[0]?.title}</Text>
        <Text>{profile.posts[0]?.content}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleCreateService}>
          <Text>Cadastrar Serviço</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePublishService}>
          <Text>Publicar Serviço</Text>
        </TouchableOpacity>
        <Button title="Chamar notificação" onPress={handleCallNotification} />

        <TouchableOpacity onPress={openMap}>
          <Text>Abrir Mapa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
