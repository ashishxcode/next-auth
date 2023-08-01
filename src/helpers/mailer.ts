import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
	console.log('emailType', emailType);
	console.log('userId', userId);
	console.log('email', email);
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);
		const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

		if (emailType === 'VERIFY_EMAIL') {
			await User.findOneAndUpdate(
				{ _id: userId },
				{ verificationToken: hashedToken, verificationTokenExpiry: tokenExpiry }
			);
		} else if (emailType === 'FORGOT_PASSWORD') {
			await User.findOneAndUpdate(
				{ _id: userId },
				{
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpiry: tokenExpiry,
				}
			);
		}

		const transporter = nodemailer.createTransport({
			host: 'sandbox.smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '970dc91b4d9212',
				pass: 'e3937112e69e95',
			},
		} as any);

		const mailOptions = {
			from: 'ashishxcode@gmail.com',
			to: email,
			subject:
				emailType === 'VERIFY_EMAIL'
					? 'Verify your email'
					: 'Reset your password',
			html: `<div>
                <h1>Hi there!</h1>
                <p>
                  Please  ${
										emailType === 'VERIFY_EMAIL'
											? 'verify your email'
											: 'reset your password '
									} by clicking the link below.
                </p>
                <a href="${
									process.env.CLIENT_URL
								}/verify-email?token=${hashedToken}">Click here</a>
								<br/>
									or copy and paste the link below in your browser
								<br/>
								${process.env.CLIENT_URL}/verify-email?token=${hashedToken}
            </div>`,
		};

		const mailResponse = await transporter.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		console.log(error);
	}
};
