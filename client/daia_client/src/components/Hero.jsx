import React from "react";
import doctorImage from '../assets/images/doctor.png';

function Hero() {
    return (
        // Replace the gradient colors with the actual colors from your design
        <div className="bg-white text-black">
            <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between">
                <div className="flex-1">
                    <div className="bg-pink-200 text-pink-700 px-3 py-1 inline-block rounded-full text-sm font-medium mb-4">
                        Health Matters
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        One Step Solution for all your dietary needs.
                    </h1>
                    <p className="text-base md:text-lg mb-8">
                        Using your BMI index we calculate whether the dish is
                        suitable for you.
                    </p>
                    {/* Replace the # with the actual link to your how-to-use page */}
                    <a
                        href="/about"
                        className="hover:animate-pulse text-primary font-semibold py-2 px-4 rounded bg-subtle-purple "
                    >
                        Learn More
                    </a>
                </div>
                <div className="flex-1 mb-16 md:mb-0">
                    <img
                        src={doctorImage}
                        alt="Doctor"
                        className="max-w-xs md:max-w-lg mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
