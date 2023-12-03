import { ILoginData } from "../intefarces/login.interface";

export async function signup(userData: ILoginData) {
	try {
		const baseUrl: string = process.env.EXPO_PUBLIC_BASE_URL!;
		const data = await fetch(`${baseUrl}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}).then((res) => {
			return res.json();
		});
		return data;
	} catch (err) {
		console.log(err);
	}
}
