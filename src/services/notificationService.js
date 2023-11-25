import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Constants from "expo-constants";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Não foi possivel pegar o token para notificação push");
      return null;
    }

    const expoToken = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.default.expoConfig?.extra?.eas.projectId,
    });
    token = expoToken.data;
    console.log(token);
  } else {
    alert("So é possivel em dispositivos fisicos");
  }

  return token;
}

