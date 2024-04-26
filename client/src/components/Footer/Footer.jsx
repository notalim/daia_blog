import { Link } from "react-router-dom";
import daiaLogo from "@src/assets/icons/daia-logo.svg";
import { footerLinks } from "./footerLinks";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
	return (
        <footer className="bg-white p-10 mt-5">
            <div className="max-w-6xl mx-auto flex flex-wrap justify-between">
                <div className="flex flex-col">
                    <Link to="/" className="flex items-center mb-4">
                        <img src={daiaLogo} alt="Daia" className="h-8 w-auto mr-2" />
                        <span>
							Smarter Sugar Sharing
						</span>
                        <span></span>
                    </Link>
                    <div className="flex space-x-3 mb-4">
                        <a href="https://www.instagram.com/daia.diabetes" target="_blank" rel="noopener noreferrer" className="text-light-purple text-dim-purple hover:text-purple-300">
                            <InstagramIcon fontSize="large" />
                        </a>
                        {/* <a
							href="https://www.instagram.com/your_instagram_account"
							target="_blank"
							rel="noopener noreferrer"
							className="text-light-purple text-dim-purple hover:text-purple-300"
						>
							<FacebookIcon fontSize="large" />
						</a> */}
                    </div>
                    <p className="text-sm">Copyright © 2024</p>
                </div>
                {footerLinks.map((column) => (
                    <div key={column.heading} className="flex flex-col mb-4">
                        <h5 className="font-bold mb-3 text-dim-purple">{column.heading}</h5>
                        {column.links.map((link) => (
                            <Link key={link} to={`/${link.toLowerCase().replace(/\s/g, "-")}`} className="text-sm text-gray-600 hover:text-black mb-2">
                                {link}
                            </Link>
                        ))}
                    </div>
                ))}
                <div className="flex flex-col">
                    <h5 className="font-bold mb-3 text-dim-purple">Contact us</h5>
                    <div className="text-sm">
                        <div className="mb-2">
                            <a href="mailto:daia@gmail.com" className="text-gray-600 hover:text-black">
                                info@daia.health
                            </a>
                        </div>
                        {/* <div className="mb-2">
							<a
								href="tel:414-687-5892"
								className="text-gray-600 hover:text-black"
							>
								(414) 687 – 5892
							</a>
						</div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
