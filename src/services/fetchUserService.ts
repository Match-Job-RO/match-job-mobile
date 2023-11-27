export async function getUserById(userId: number, token: string) {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
	const bearerToken = `Bearer ${token}`;
	const user = await fetch(`${baseUrl}/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: bearerToken,
		},
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.log(err);
		});

	return user;
}
