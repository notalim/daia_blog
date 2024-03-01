import { useContext } from "react";

import NavbarLoggedOut from "@src/components/Navbar/NavbarLoggedOut";
import NavbarLoggedIn from "@src/components/Navbar/NavbarLoggedIn";
import Footer from "@src/components/Footer/Footer";
import { AuthContext } from "@src/contexts/AuthContext";

const Page = ({ children }) => {
	const { user } = useContext(AuthContext);
	return (
		<>
			<div className="fixed top-0 w-full z-50">
                {user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
            </div>
            {/* Adjust pt (padding-top) based on your navbar's height, example uses pt-16 (4rem) which might need adjustment */}
            <div className="bg-background-purple flex flex-col overflow-x-hidden justify-center items-center pt-16">
                {children}
            </div>
			<Footer />
		</>
	);
};

export default Page;
