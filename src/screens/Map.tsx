import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { View } from "react-native";

export default function Map() {
	let [region, setRegion] = useState({
		latitude: -11.4339,
		longitude: -61.4429,
		latitudeDelta: 0.04,
		longitudeDelta: 0.04,
	});

	useEffect(() => {
		const getCurrentLocation = async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();

				if (status !== "granted") {
					console.error("Permissão de localização não concedida");
					return;
				}
				const location = await Location.getCurrentPositionAsync({});

				setRegion({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.04,
					longitudeDelta: 0.04,
				});
			} catch (error) {
				console.error("Erro ao obter a localização", error);
			}
		};

		getCurrentLocation();
	}, []);

	return (
		<View>
			<MapView
				style={{ width: "100%", height: "100%" }}
				region={region}
				showsUserLocation></MapView>
		</View>
	);
}
