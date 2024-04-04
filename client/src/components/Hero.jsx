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
            <WavyBackground className="max-w-4xl mx-auto pb-40">
                <div className="flex-1 mb-16 md:mb-0">
                    <animated.img
                        src={blackTextLogo}
                        alt="Daia Logo"
                        className="max-w-xs md:max-w-lg mx-auto"
                        style={logoAnimation}
                        onLoad={() => setShowLogo(true)}
                    />
                    <animated.div style={logoAnimation} className="">
                        <p className="text-center text-2xl font-bold">
                            Smarter Sugar Sharing
                        </p>
                    </animated.div>
                </div>
            </WavyBackground>
        </div>
    );
}

export default Hero;
