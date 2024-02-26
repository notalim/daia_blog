import React from "react";
import { Link } from "react-router-dom";
import daiaLogo from "@src/assets/icons/daia-logo.svg";
import { footerLinks } from "./footerLinks";

const Footer = () => {
	return (
		<footer className="bg-background-purple p-10">
			<div className="max-w-6xl mx-auto flex flex-wrap justify-between">
				<div className="flex flex-col">
					<Link to="/" className="flex items-center mb-4">
						<img
							src={daiaLogo}
							alt="Daia"
							className="h-8 w-auto mr-2"
						/>
						<span>
							{/* Add tagline */}
						</span>
					</Link>
					<div className="flex space-x-3 mb-4">
						{/* Social icons can be added here */}
					</div>
					<p className="text-sm">Copyright © 2024</p>
				</div>
				{footerLinks.map((column) => (
					<div key={column.heading} className="flex flex-col mb-4">
						<h5 className="font-bold mb-3 text-dim-purple">
							{column.heading}
						</h5>
						{column.links.map((link) => (
							<Link
								key={link}
								to={`/${link
									.toLowerCase()
									.replace(/\s/g, "-")}`}
								className="text-sm text-gray-600 hover:text-black mb-2"
							>
								{link}
							</Link>
						))}
					</div>
				))}
				<div className="flex flex-col">
					<h5 className="font-bold mb-3 text-dim-purple">
						Contact us
					</h5>
					<div className="text-sm">
						<div className="mb-2">
							<a
								href="mailto:contact@company.com"
								className="text-gray-600 hover:text-black"
							>
								contact@company.com
							</a>
						</div>
						<div className="mb-2">
							<a
								href="tel:414-687-5892"
								className="text-gray-600 hover:text-black"
							>
								(414) 687 – 5892
							</a>
						</div>
						<address className="not-italic mb-2">
							794 Mcallister St
							<br />
							San Francisco, 94102
						</address>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
