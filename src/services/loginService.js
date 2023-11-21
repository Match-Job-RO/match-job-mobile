import AsyncStorage from '@react-native-async-storage/async-storage';

export async function login(userData) {
  try {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    const data = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((res) => {
      return res.json();
    });

    await AsyncStorage.setItem("loginData", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
  }
}
