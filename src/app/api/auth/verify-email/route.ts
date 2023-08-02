import { connect } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { token, userId } = body;

		if (!token || !userId) {
			return NextResponse.json(
				{ error: 'Missing required parameters' },
				{ status: 400 }
			);
		}

		const user = await User.findOne({
			_id: userId,
		});

		if (!user) {
			return NextResponse.json(
				{ error: 'User not belongs to this token' },
				{ status: 400 }
			);
		}

		if (
			user &&
			user.verificationToken !== token &&
			user.verificationTokenExpiry < Date.now()
		) {
			return NextResponse.json(
				{ error: 'Invalid or expired token' },
				{ status: 400 }
			);
		} else if (user && user.isVerified) {
			return NextResponse.json(
				{ error: 'Email already verified' },
				{ status: 400 }
			);
		} else {
			user.isVerified = true;

			await user.save();

			return NextResponse.json(
				{ message: 'Email verified', success: true },
				{ status: 200 }
			);
		}
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
