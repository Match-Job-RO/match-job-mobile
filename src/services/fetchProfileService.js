export async function getProfileById(profileId, token) {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL
    const bearerToken = `Bearer ${token}`;
    const profile = await fetch(`${baseUrl}/profile/${profileId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err);
    });

    return profile;
}