import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getUserById } from "../services/fetchUserService";
import { getProfileById } from "../services/fetchProfileService";

export default function Home(data) {
    const paramData = JSON.parse(data.route.params.data);
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    async function fetchProfile() {
        const userData = await getUserById(paramData.userId, paramData.token);
        console.log("userData:", userData);
        const profileData = await getProfileById(userData.profiles.id, paramData.token);
        console.log("profileData:", profileData);
        setProfile(profileData);
    }

    useEffect(() => {
        fetchProfile();
        console.log(profile);
    }, [{}])

    return(
        <View>
            <View>
                <Text>Home</Text>
            </View>
            <View>
                <Text>{profile.name}</Text>
            </View>
            <View>
                <Text>{profile.posts?.title}</Text>
                <Text>{profile.posts?.content}</Text>
            </View>
        </View>
    )
}