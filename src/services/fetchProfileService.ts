import { IProfile } from "../intefarces/profile.interface";

export async function getProfileById(
	profileId: number,
	token: string
): Promise<IProfile> {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/profile/${profileId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
	});
	if (!response.ok) {
		throw new Error(`Erro ao fazer login: ${response.statusText}`);
	}
	const profile: IProfile = await response.json();

	return profile;
}
