import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/Navgator/Navgator";

export default function App(): JSX.Element {
	return (
		<NavigationContainer>
			<Navigator />
		</NavigationContainer>
	);
}
