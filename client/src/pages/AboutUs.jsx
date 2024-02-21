import React from "react";
import Temp from "../../src/assets/images/doctor.png";
function AboutUs() {
	return (
		<div className="min-h-screen flex items-center bg-background-purple">
			<div className="w-full max-w-4xl mx-auto flex justify-between items-start">
				<div className="space-y-6 p-8">
					<div className="flex justify-center mb-4">
						<img
							src={Temp}
							alt="About Us"
							className="max-w-full h-auto max-h-32" // Adjust max-h-32 to set the maximum height of the image
						/>
					</div>
					<h2 className="text-2xl font-bold text-gray-900">
						About Us
					</h2>
					<p>
						Welcome to Daia, where we're dedicated to empowering
						individuals with diabetes to live healthier, more
						informed lives. At Daia, we understand the daily
						challenges that come with managing high blood sugar
						levels. That's why we've developed a comprehensive
						platform that integrates seamlessly with Dexcom
						monitors, providing real-time insights into your blood
						sugar levels like never before. Our platform goes beyond
						just displaying data – it's a powerful tool designed to
						help you take control of your health. With our intuitive
						graphing features, you can easily visualize trends and
						patterns in your blood sugar levels, empowering you to
						make informed decisions about your lifestyle and
						treatment. But we don't stop there. We know that
						managing diabetes is a team effort, which is why we've
						incorporated features to keep your loved ones informed
						and involved. Our alert system notifies your family
						members or caregivers if your blood sugar levels surpass
						a predefined threshold, providing peace of mind for
						everyone involved. At Daia, we're not just building
						software – we're building a community. We're here to
						support you every step of the way on your journey
						towards better health. Whether you're newly diagnosed or
						a seasoned veteran, we're committed to providing you
						with the tools and resources you need to thrive. Join us
						today and discover a new way to manage diabetes – one
						that's built on innovation, empathy, and a genuine
						desire to make a difference in the lives of others.
					</p>
					<h2 className="text-center text-2xl font-bold text-gray-900">
						Welcome to the Daia Family!
					</h2>
				</div>
				<div className="w-full max-w-xs">
					{/* Additional content can be added here if needed */}
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
