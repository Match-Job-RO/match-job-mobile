import { ICreateProfile, IProfile } from "../intefarces/profile.interface";

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

export async function createProfile(
	profileData: ICreateProfile,
	token: string
): Promise<IProfile> {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}/profile`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
		body: JSON.stringify(profileData),
	});

	if (!response.ok) {
		console.log(response.json());
		throw new Error("Erro ao tentar criar o perfil");
	}

	const createdProfileData = response.json();

	return createdProfileData;
}
