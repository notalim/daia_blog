// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import LandingPage from "./containers/LandingPage";
import RegisterPage from "./containers/RegisterPage";
import MainPage from "./containers/MainPage";
import { Routes, Route, Router } from "react-router-dom";

function App() {
	return (
		<AppProvider>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/main" element={<MainPage />} />
				<Route
					path="*"
					element={
						<div className="flex justify-center items-center h-screen">
							<h1 className="text-4xl font-bold text-red-500">
								Error 404: Page Not Found
							</h1>
						</div>
					}
				/>
			</Routes>
		</AppProvider>
	);
}

export default App;
