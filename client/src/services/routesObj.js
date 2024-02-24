import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Faq from "../pages/Faq";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Settings from "../pages/Settings";
import UserDashboardPage from "../pages/UserDashboardPage";

export const routes = [
	{ path: "/", comp: LandingPage },
	{ path: "/register", comp: RegisterPage },
	{ path: "/login", comp: LoginPage },
	{ path: "/dashboard", comp: UserDashboardPage },
	{ path: "/about", comp: AboutUs },
	{ path: "/faq", comp: Faq },
	{ path: "/contact-us", comp: ContactUs },
	{ path: "/settings", comp: Settings },
];
