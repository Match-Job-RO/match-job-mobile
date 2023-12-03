import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginData, ILoginResponse } from "../intefarces/login.interface";

export async function login(userData: ILoginData): Promise<ILoginResponse> {
	try {
		const baseUrl: string = process.env.EXPO_PUBLIC_BASE_URL!;
		const response = await fetch(`${baseUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`Erro ao fazer login: ${response.statusText}`);
		}
		const data: ILoginResponse = await response.json();

		await AsyncStorage.setItem("loginData", JSON.stringify(data));

		return data;
	} catch (err) {
		console.error("Erro durante a função login:", err);
		throw err;
	}
}
