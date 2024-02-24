import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Faq from "../pages/Faq";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Settings from "../pages/Settings";
import UserDashboardPage from "../pages/UserDashboardPage";

export const routes = [
	{ link: "/", comp: LandingPage, protected: false},
	{ link: "/register", comp: RegisterPage, protected: false},
	{ link: "/login", comp: LoginPage, 	protected: false},
	{ link: "/dashboard", comp: UserDashboardPage, protected: true},
	{ link: "/about", comp: AboutUs, protected: false},
	{ link: "/faq", comp: Faq, protected: false},
	{ link: "/contact-us", comp: ContactUs, protected: false},
	{ link: "/settings", comp: Settings, protected: true},
];
