import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import purpleLogoSVG from "../assets/images/daia_dark_purple_logo.svg";
import blackTextLogo from "../assets/images/black_text_and_logo.svg";
// import Typewriter from "typewriter-effect/dist/core";
import { WavyBackground } from "@src/@/components/ui/wavy-background";

function Hero() {
	const [showLogo, setShowLogo] = useState(false);

	const logoAnimation = useSpring({
		opacity: showLogo ? 1 : 0,
		transform: showLogo ? "scale(1)" : "scale(0)",
	});

	return (
    <div className="bg-background-purple text-black">
			{/* <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between"> */}
			<WavyBackground className="max-w-4xl mx-auto pb-40">
				<div className="flex-1 mb-16 md:mb-0">
					<animated.img
						src={blackTextLogo}
						alt="Daia Logo"
						className="max-w-xs md:max-w-lg mx-auto"
						style={logoAnimation}
						onLoad={() => setShowLogo(true)}
					/>
					<animated.div 
					style={logoAnimation}
					className=""
					>
						<p className="text-center text-2xl font-bold">Smarter Sugar Sharing</p>
					</animated.div>
        </div>
      </WavyBackground>
			{/* </div> */}
			<div className="container mx-auto px-6 py-8">
				<div className="md:flex justify-between items-start">
					{/* Left side content */}
					<div className="md:w-1/2 mb-6 md:mb-0">
						<div className="text-center md:text-left">
							{" "}
							{/* Center text on mobile */}
							<h2 className="text-gray-600 text-lg uppercase mb-6">
								Features We Provide
							</h2>
							<div className="mb-6">
								<div className="mb-6 md:mb-0">
									<h3 className="text-2xl font-bold text-purple-600">
										Diabetes made easier
									</h3>
									<p className="text-gray-600 mt-2">
										We calculate your BMI index from data
										like age, height, weight.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right side badges */}
					<div className="md:w-1/2 flex flex-col items-center md:flex-row md:justify-end">
						<div className="text-center md:text-right">
							{" "}
							{/* Center text on mobile */}
							{/* Each badge section */}
							<div className="flex flex-col items-center text-center mb-4 md:mb-0 md:ml-4">
								<h3 className="text-2xl font-bold text-purple-600">
									Sugar Tracking
								</h3>
								<p className="text-gray-600 mt-2">
									All of your necessary metrics in one app
								</p>
							</div>
							<div className="flex flex-col items-center text-center mb-4 md:mb-0 md:ml-4">
								<h3 className="text-2xl font-bold text-purple-600">
									Helpful tips
								</h3>
								<p className="text-gray-600 mt-2">
									We provide food recommendation according to
									your calorie requirements.
								</p>
							</div>
							<div className="flex flex-col items-center text-center md:ml-4">
								<h3 className="text-2xl font-bold text-purple-600">
									Interactive Chatbot
								</h3>
								<p className="text-gray-600 mt-2">
									Solve your queries by interacting with our
									bot.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Hero;
