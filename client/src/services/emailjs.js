import emailjs from "@emailjs/browser";

export const sendEmail = (message) => {
	emailjs
		.sendForm(
			import.meta.env.VITE_EMAIL_SERVICE_ID,
			import.meta.env.VITE_EMAIL_TEMPLATE_ID,
			message,
			import.meta.env.VITE_EMAIL_USER_ID
		)
		.then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
};
