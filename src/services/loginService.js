export async function login(userData) {
    try {
            const baseUrl = process.env.EXPO_PUBLIC_BASE_URL
            const data = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }).then((res) => {
                return res.text();
            });
            return data;
        } catch(err) {
            console.log(err);
        }
}