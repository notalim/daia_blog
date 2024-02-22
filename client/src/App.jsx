// App.jsx
import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserDashboardPage from "./pages/UserDashboardPage";

import PageLayout from "./pages/Page/Page";
import Construction from "./pages/Construction";
import { footerLinks } from "./components/Footer/footerLinks";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import ContactUs from "./pages/ContactUs";

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

	return (
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={
						<PageLayout>
							<LandingPage />
						</PageLayout>
					}
				/>
				<Route
					path="/register"
					element={
						<PageLayout>
							<RegisterPage />
						</PageLayout>
					}
				/>
				<Route
					path="/login"
					element={
						<PageLayout>
							<LoginPage />
						</PageLayout>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<PageLayout>
							<UserDashboardPage />
						</PageLayout>
					}
				/>
				{constructionPages}
				<Route
					path="/about"
					element={
						<PageLayout>
							<AboutUs />
						</PageLayout>
					}
				/>
				<Route
					path="/faq"
					element={
						<PageLayout>
							<Faq />
						</PageLayout>
					}
				/>
				<Route
					path="/contact-us"
					element={
						<PageLayout>
							<ContactUs />
						</PageLayout>
					}
				/>
			</Routes>
		</AuthProvider>
	);
}

export default App;
