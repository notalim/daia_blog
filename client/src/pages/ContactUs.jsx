import React, { useState } from "react";

function ContactUs() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add your logic here to handle form submission
		console.log(formData);
	};

	return (
		<div className="min-h-screen flex items-center bg-gradient-to-br from-purple-100 to-pink-500">
			<div className="w-full max-w-4xl mx-auto">
				<div className="p-8 bg-gray-200 rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold text-gray-900 mb-8">
						Contact Us
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<input
								type="text"
								name="name"
								placeholder="Your Name"
								value={formData.name}
								onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
							<input
								type="email"
								name="email"
								placeholder="Your Email"
								value={formData.email}
								onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<input
								type="tel"
								name="phone"
								placeholder="Your Phone Number"
								value={formData.phone}
								onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
						</div>
						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							className="input-field border border-gray-300 rounded-md px-4 py-2 h-32 w-full"
						></textarea>
						<button
							type="submit"
							className="btn-primary w-1/2 py-3 rounded-md text-white font-bold bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
