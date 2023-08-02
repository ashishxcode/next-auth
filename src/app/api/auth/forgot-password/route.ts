import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import { connect } from '@/lib/db';

connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { email } = body;

		// check if user already exists
		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{
					message: 'User does not exist',
				},
				{
					status: 400,
				}
			);
		}

		// send forgot password email
		await sendEmail({
			email,
			emailType: 'FORGOT_PASSWORD',
			userId: user._id,
		});

		return NextResponse.json(
			{
				message: 'Email sent successfully',
				success: true,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error.message,
				success: false,
			},
			{
				status: 500,
			}
		);
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const body = await req.json();

		const { token, newPassword } = body;

		if (!token || !newPassword) {
			return NextResponse.json(
				{
					message: 'Missing arguments',
					success: false,
				},
				{
					status: 400,
				}
			);
		}

		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{
					message: 'Invalid or expired token',
					success: false,
				},
				{
					status: 400,
				}
			);
		}

		const hashedPassword = await bcryptjs.hash(newPassword, 10);

		user.password = hashedPassword;

		await user.save();

		return NextResponse.json(
			{
				message: 'Password updated successfully',
				success: true,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: error.message,
				success: false,
			},
			{
				status: 500,
			}
		);
	}
}
