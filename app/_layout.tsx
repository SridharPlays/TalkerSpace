import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProdiver from "@/providers/ClerkAndConvexProdiver";

export default function RootLayout() {
	return (
		<ClerkAndConvexProdiver>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
		</ClerkAndConvexProdiver>
	)
}
