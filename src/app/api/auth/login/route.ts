import { connect } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { email, password } = body;

		// check if user already exists
		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{
					message: 'User does not exist',
				},
				{
					status: 404,
				}
			);
		}

		// check if password is correct
		const isMatch = await bcryptjs.compare(password, user.password);

		if (!isMatch) {
			return NextResponse.json(
				{
					message: 'Invalid credentials',
				},
				{
					status: 400,
				}
			);
		}

		// token data
		const tokenData = {
			id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
		};

		// create token
		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {
			expiresIn: '7d',
		});

		const response = NextResponse.json({
			message: 'Login successful',
			success: true,
		});

		// set cookie
		response.cookies.set('token', token, {
			httpOnly: true,
		});

		return response;
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
