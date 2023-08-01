import { connect } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { stat } from 'fs';
import { use } from 'react';

connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { token } = body;

		if (!token) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
		}

		const user = await User.findOne({
			verificationToken: token,
			verificationTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'User not belongs to this token' },
				{ status: 400 }
			);
		}

		user.isVerified = true;

		await user.save();

		return NextResponse.json(
			{ message: 'Email verified', success: true },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
