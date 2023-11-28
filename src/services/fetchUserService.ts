import { IUserData } from "./../intefarces/user.interface";

export async function getUserById(
	userId: number,
	token: string
): Promise<IUserData> {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
	});
	if (!response.ok) {
		throw new Error(`Erro ao fazer login: ${response.statusText}`);
	}

	const user: IUserData = await response.json();

	return user;
}
