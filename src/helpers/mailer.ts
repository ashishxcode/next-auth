import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// Validate input parameters
		if (!email || !emailType || !userId) {
			throw new Error('Missing required parameters.');
		}

		// Hash the userId and set token expiry
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

		// Update the user model based on email type
		const updateFields =
			emailType === 'VERIFY_EMAIL'
				? {
						verificationToken: hashedToken,
						verificationTokenExpiry: tokenExpiry,
				  }
				: {
						forgotPasswordToken: hashedToken,
						forgotPasswordTokenExpiry: tokenExpiry,
				  };

		await User.findOneAndUpdate({ _id: userId }, updateFields);

		// Create a nodemailer transporter
		const transporter = nodemailer.createTransport({
			host: process.env.MAILTRAP_HOST,
			port: Number(process.env.MAILTRAP_PORT),
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		});

		const mailLink = `${process.env.CLIENT_URL}/${
			emailType === 'VERIFY_EMAIL' ? 'verify-email' : 'forgot-password'
		}?
		token=${hashedToken}&userId=${userId}`;

		const emailSubject =
			emailType === 'VERIFY_EMAIL'
				? 'Verify your email'
				: 'Reset your password';

		const emailMessage =
			emailType === 'VERIFY_EMAIL'
				? 'verify your email'
				: 'reset your password';

		const emailContent = `
		<div>
		  <h1>Hi there!</h1>
		  <p>
		    Please ${emailMessage} by clicking the link below.
		  </p>
		  <a href="${mailLink}">Click Here</a>
		  <br/>
		  or copy and paste the link below in your browser
		  <br/>
		  <p>
		    ${mailLink}	
		  </p>	
	    </div>
	    `;

		const mailOptions = {
			from: 'ashishxcode@gmail.com',
			to: email,
			subject: emailSubject,
			html: emailContent,
		};

		// Send the email
		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error) {
		console.error('Error sending email:', error);
		throw error;
	}
};
