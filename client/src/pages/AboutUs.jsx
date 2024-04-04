import React from "react";

function AboutUs() {
    return (
        <div className="min-h-screen flex items-center bg-background-purple">
            <div className="w-full max-w-4xl mx-auto">
                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        About Us
                    </h1>
                    <div className="space-y-8">
                        <div className="border border-gray-300 p-6 rounded-lg">
                            <p>
                                Daia started out of a new college student’s need for more control in sharing her blood sugar.
                            </p>
                        </div>
                        <div className="border border-gray-300 p-6 rounded-lg">
                            <p>
                                Before moving to college, Arianna used to share her blood sugar with her parents. But she stopped sharing the day she moved in because she wanted independence, and because her parents lived far away and wouldn’t be able to help during a low. She didn’t want to make her roommate or RA download an app and have access to her sugar all of the time, so for the first time in having a CGM, she was not sharing her blood sugar with anyone. The first time her blood sugar went low and she was alone in her dorm room, she was scared, and wondered how long it would take anyone to realize if she had a serious medical emergency.
                            </p>
                        </div>
                        <div className="border border-gray-300 p-6 rounded-lg">
                            <p>
                                And so, with minimal coding experience, Arianna started learning how to build an app in 2021. In 2022, she started working with Frank, as he had experience in app development, works at a health-tech start up, and has a passion for using technology to solve problems in healthcare. Together they incorporated later that year, and continued to build the app until it was ready to begin beta testing in 2023.
                            </p>
                        </div>
                        <div className="border border-gray-300 p-6 rounded-lg">
                            <p>
                                With an upcoming 2024 launch, we are excited to help the millions of diabetics who want a smarter way to share their blood sugar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
