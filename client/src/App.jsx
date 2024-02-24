import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./contexts/ProtectedRoute";


import PageLayout from "./pages/Page/Page";
import Construction from "./pages/Construction";
import { footerLinks } from "./components/Footer/footerLinks";

import { routes } from "./services/routesObj";

import { Toaster } from "@/components/ui/toaster";

function App() {

	const implementedPages = ["About", "Contact us"];

	const constructionPages = footerLinks.flatMap((section) =>
		section.links
			.filter((item) => !implementedPages.includes(item))
			.map((link) => (
				<Route
					key={link}
					path={`/${link.toLowerCase().replace(/\s/g, "-")}`}
					element={
						<PageLayout>
							<Construction message={link} />
						</PageLayout>
					}
				/>
			))
	);

	const generateRoutes = routes.flatMap((section) => (
		<Route
			key={section.path}
			path={section.path}
			element={
				<PageLayout>
					<section.comp />
				</PageLayout>
			}
		/>
	));

	return (
		<AuthProvider>
			<Routes>
				{constructionPages}
				{generateRoutes}
			</Routes>
		</AuthProvider>
	);
}

export default App;
