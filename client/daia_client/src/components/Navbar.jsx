// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Boxes } from "lucide-react";

// const LinkItems = [
//     { name: "Home", pathname: "/" },
//     { name: "About us", pathname: "/about" },
//     { name: "How to use", pathname: "/faq" },
// ];

// const Navbar = () => {
//     const [activeTab, setActiveTab] = useState("Home");

//     const handleTabChange = (tabName) => {
//         setActiveTab(tabName);
//     };

//     const NavItem = ({ name, pathname }) => {
//         const location = useLocation();
//         return (
//             <Link to={pathname}>
//                 <div
//                     className={`${
//                         location.pathname === pathname
//                             ? "text-secondary border-b-2 border-secondary"
//                             : "text-gray-600"
//                     } text-lg mr-8 cursor-pointer`}
//                     onClick={() => handleTabChange(name)}
//                 >
//                     {name}
//                 </div>
//             </Link>
//         );
//     };

//     return (
//         <nav className="bg-white p-4 text-white flex justify-between items-center">
//             <div className="flex items-center">
//                 <Boxes
//                     size={40}
//                     strokeWidth={1}
//                     color="#FFA39C"
//                     className="h-10 w-9 mr-2"
//                 />
//                 <span className="text-black font-semibold text-xl tracking-tight">
//                     Daia
//                 </span>
//             </div>
//             <div className="flex">
//                 {LinkItems.map((link) => (
//                     <NavItem
//                         key={link.name}
//                         name={link.name}
//                         pathname={link.pathname}
//                     />
//                 ))}
//             </div>
//             <div className="flex items-center">
//                 {/* NEED USER DATA PASSED HERE */}
//                 <span className="text-black font-semibold text-lg mr-4">
//                     John Doe
//                 </span>
//                 <img
//                     src="/user-profile.jpg"
//                     alt="Profile"
//                     className="h-8 w-8 rounded-full"
//                 />
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import daiaLogo from '../assets/icons/daia-logo.svg'

const LinkItems = [
    { name: "Home", pathname: "/" },
    { name: "About Us", pathname: "/about" },
    { name: "How to use", pathname: "/faq" },
];

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();

    const NavItem = ({ name, pathname }) => {
        const isActive = location.pathname === pathname;
        return (
            <Link to={pathname} className={`mx-4`}>
                <div
                    className={`${
                        isActive
                            ? "text-primary border-b-2 border-primary font-medium"
                            : "text-gray-600 hover:text-black"
                    } text-base cursor-pointer`}
                    onClick={() => setActiveTab(name)}
                >
                    {name}
                </div>
            </Link>
        );
    };

    return (
        <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-md">
            <div className="flex items-center">
                <Link to="/" className={`mx-4`}>
                    <img src={daiaLogo} alt="Daia" className="h-8 w-auto mr-2" />
                </Link>
                {/* <span className="text-black font-semibold text-lg tracking-tight">
                    Daia
                </span> */}
            </div>
            <div className="flex">
                {LinkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        name={link.name}
                        pathname={link.pathname}
                    />
                ))}
            </div>
            <div className="flex items-center">
                <Link to="/register" className="text-black font-medium text-base mr-4">
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
