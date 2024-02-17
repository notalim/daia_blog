import { useContext } from "react";

import NavbarLoggedOut from "@src/components/Navbar/NavbarLoggedOut";
import NavbarLoggedIn from "@src/components/Navbar/NavbarLoggedIn";
import Footer from "@src/components/Footer/Footer";
import { AuthContext } from "@src/contexts/AuthContext";

const Page = ({ children }) => {
    const { user } = useContext(AuthContext);
    return (
        <>
            {user ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
            <div className="bg-background-purple flex flex-col min-h-screen overflow-x-hidden">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default Page;
