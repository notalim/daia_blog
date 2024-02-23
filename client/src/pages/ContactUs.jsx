import { useState } from "react";
import { useRef } from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
import { sendEmail } from "~/services/emailjs";

function ContactUs() {
	const form = useRef();
	const [open, setOpen] = useState(false);

	const handleEmail = (e) => {
		e.preventDefault();
		setOpen(true);
		sendEmail(form.current);
		e.target.reset();
	};
	return (
		<div className="min-h-screen flex items-center bg-gradient-to-br from-purple-100 to-pink-500">
			<div className="w-full max-w-4xl mx-auto">
				<div className="p-8 bg-gray-200 rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold text-gray-900 mb-8">
						Contact Us
					</h2>
					<form
						ref={form}
						onSubmit={handleEmail}
						className="space-y-4"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<input
								type="text"
								name="name"
								placeholder="Your Name"
								// value={formData.name}
								// onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
							<input
								type="email"
								name="email"
								placeholder="Your Email"
								// value={formData.email}
								// onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<input
								type="tel"
								name="phone"
								placeholder="Your Phone Number"
								// value={formData.phone}
								// onChange={handleChange}
								className="input-field border border-gray-300 rounded-md px-4 py-2"
							/>
						</div>
						<textarea
							name="message"
							placeholder="Your Message"
							// value={formData.message}
							// onChange={handleChange}
							className="input-field border border-gray-300 rounded-md px-4 py-2 h-32 w-full"
						></textarea>
						<button
							type="submit"
							className="btn-primary w-1/2 py-3 rounded-md text-white font-bold bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
						>
							Submit
						</button>
					</form>
					<div className="alert-contatiner pt-2">
						<Collapse in={open} className="alert">
							<Alert
								variant="filled"
								severity="success"
								action={
									<IconButton
										aria-label="close"
										// color="inherit"
										size="small"
										onClick={() => {
											setOpen(false);
										}}
									>
										<CloseIcon fontSize="inherit" />
									</IconButton>
								}
								sx={{ mb: 2 }}
							>
								Message Sent! Daia will get back to you as soon
								as possible.
							</Alert>
						</Collapse>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContactUs;
