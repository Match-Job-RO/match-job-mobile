import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/Navgator/Navigator";

export default function App(): JSX.Element {
	return (
		<NavigationContainer>
			<>
				<StatusBar style="auto" />
				<RootNavigator />
			</>
		</NavigationContainer>
	);
}
