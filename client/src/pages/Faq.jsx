import React from "react";

function Faq() {
	return (
		<div className="min-h-screen flex items-center bg-background-purple">
			<div className="w-full max-w-4xl mx-auto">
				<div className="p-8">
					<h2 className="text-3xl font-bold text-gray-900 mb-8">
						Frequently Asked Questions
					</h2>
					<div className="space-y-8">
						<div className="border border-gray-300 p-6 rounded-lg">
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								How do I register for an account?
							</h3>
							<p className="text-gray-700">
								To register for an account, simply click on the
								"Register" button on the top right corner of the
								homepage and follow the instructions provided.
							</p>
						</div>

						<div className="border border-gray-300 p-6 rounded-lg">
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								Can I track my blood sugar levels with your
								platform?
							</h3>
							<p className="text-gray-700">
								Yes, our platform allows you to track your blood
								sugar levels using compatible devices such as
								Dexcom monitors. You can view your real-time
								data and trends to better manage your health.
							</p>
						</div>

						<div className="border border-gray-300 p-6 rounded-lg">
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								How secure is my data?
							</h3>
							<p className="text-gray-700">
								We take the security of your data very
								seriously. Our platform employs
								industry-standard encryption protocols to ensure
								that your personal information and health data
								remain secure and private.
							</p>
						</div>

						<div className="border border-gray-300 p-6 rounded-lg">
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								Can I share my data with my healthcare provider?
							</h3>
							<p className="text-gray-700">
								Yes, you have the option to share your data with
								your healthcare provider securely through our
								platform. This can help your healthcare provider
								make more informed decisions about your
								treatment and care.
							</p>
						</div>

						<div className="border border-gray-300 p-6 rounded-lg">
							<h3 className="text-xl font-bold text-gray-900 mb-2">
								How can I contact customer support?
							</h3>
							<p className="text-gray-700">
								If you have any questions or need assistance,
								you can reach out to our customer support team
								by emailing support@example.com or by calling
								our toll-free number at 1-800-123-4567.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Faq;
