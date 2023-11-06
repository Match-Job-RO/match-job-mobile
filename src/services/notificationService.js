import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default async function handleCallNotification() {
    // const { status } = await Notifications.getPermissionsAsync();

    // if (status !== "granted") {
    //   Alert.alert("As notificações não estão ativas");

    //   return;
    // }

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
