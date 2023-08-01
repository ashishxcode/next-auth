import { connect } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { name, username, email, password } = body;

		// check if user already exists
		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{
					message: 'User already exists',
				},
				{
					status: 400,
				}
			);
		}

		// hash password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// create user
		const newUser = new User({
			name,
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();

		// send verification email
		await sendEmail({
			email,
			emailType: 'VERIFY_EMAIL',
			userId: savedUser._id,
		});

		return NextResponse.json(
			{
				message: 'User created successfully',
				data: savedUser,
			},
			{
				status: 201,
			}
		);
	} catch (err: any) {
		return NextResponse.json(
			{
				message: 'Something went wrong',
				error: err.message,
			},
			{
				status: 500,
			}
		);
	}
}
