import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";
import { registerForPushNotificationsAsync } from "../services/notificationService";
import * as Notifications from "expo-notifications";
import { BottomNavgator } from "../Navgator/Navgator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  let loginData;
  const [profile, setProfile] = useState({ name: "", posts: {} });
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function getLocalStorageItem() {
    try {
      const jsonValue = await AsyncStorage.getItem("loginData");
      loginData = JSON.parse(jsonValue);
    } catch (error) {
      console.error(error);
    }
  }

  async function registerForPushNotifications() {
  try {
    const token = await registerForPushNotificationsAsync();
    if (token == null) {
      console.error("Ops");
      return;
    }
    setExpoPushToken(token);

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(true);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
  } catch (error) {
    console.error("Erro ao registrar notificações:", error);
  }
}

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
    await getLocalStorageItem();
    try {
      const userData = await getUserById(loginData.userId, loginData.token);
      console.log(userData);
      const profileData = await getProfileById(
        userData.profiles.id,
        loginData.token
      );
      return profileData;
    } catch (error) {
      console.error("Erro ao buscar dados do perfil: ", error);
    }
  }

  async function fetchData() {
  try {
    await registerForPushNotifications();
    
    if (isLoading) {
      const profileData = await fetchProfile();
      setProfile(profileData);
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

  useEffect(() => {
    fetchData();

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
  }, [fetchData]);

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
      <BottomNavgator />
    </View>

  );
}
