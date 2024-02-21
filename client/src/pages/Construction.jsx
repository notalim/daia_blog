import { Link } from "react-router-dom";
// import daiaLogo from "@src/assets/icons/daia-logo.svg";

const Construction = ({ message }) => {
	return (
		<div className="bg-white min-h-screen flex flex-col items-center justify-center">
			<Link to="/" className="flex items-center mb-4">
				{/* <img src={daiaLogo} alt="Daia" className="h-8 w-auto mr-2" /> */}
				<span className="text-lg font-semibold text-gray-800">
					Daia is working on building the {message}'s page.
				</span>
			</Link>
			<p className="text-gray-600 mb-8">Come back soon for updates!</p>
			<p className="text-sm text-gray-500">
				Need assistance?{" "}
				<Link to="/contact" className="text-blue-500 hover:underline">
					Contact us
				</Link>
			</p>
			<p className="text-sm text-gray-500 mt-1">
				&copy; {new Date().getFullYear()} Daia. All rights reserved.
			</p>
		</div>
	);
};

export default Construction;
