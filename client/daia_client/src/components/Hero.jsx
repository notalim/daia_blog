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
                        Instant low blood sugar alerts.
                    </h1>
                    <p className="text-base md:text-lg mb-8">
                        Using your Dexcom device to keep your loved ones in the know.
                    </p>
                    {/* Replace the # with the actual link to your how-to-use page */}
                    <a
                        href="/about"
                        className="hover:animate-pulse text-primary font-semibold py-2 px-4 rounded bg-subtle-purple hover:"
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
            <div className="container mx-auto px-6 py-8">
                <div className="md:flex justify-between items-start">
                    {/* Left side content */}
                    <div className="md:w-1/2">
                        <h2 className="text-gray-600 text-lg uppercase mb-6">Features We Provide</h2>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-purple-600">Diabetes made easier</h3>
                            <p className="text-gray-600 mt-2">We calculate your BMI index from data like age, height, weight.</p>
                        </div>
                    </div>

                    {/* Right side badges */}
                    <div className="md:w-1/2 flex flex-col md:flex-row justify-end items-center">
                        {/* Each badge section */}
                        <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:ml-4">
                            <h3 className="text-2xl font-bold text-purple-600">Sugar Tracking</h3>
                            <p className="text-gray-600 mt-2">All of your necessary metrics in one app</p>
                        </div>
                        <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:ml-4">
                            <h3 className="text-2xl font-bold text-purple-600">Helpful tips</h3>
                            <p className="text-gray-600 mt-2">We provide food recommendation according to your calorie requirements.</p>
                        </div>
                        <div className="flex flex-col items-center text-center md:ml-4">
                            <h3 className="text-2xl font-bold text-purple-600">Interactive Chatbot</h3>
                            <p className="text-gray-600 mt-2">Solve your queries by interacting with our bot.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
