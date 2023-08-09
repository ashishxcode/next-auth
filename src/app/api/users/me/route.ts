import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/lib/db';

connect();

export async function GET(request: NextRequest) {
	try {
		const userID = getDataFromToken(request);

		const user = await User.findById({
			_id: userID,
		}).select('-password');

		if (!user) {
			return NextResponse.json(
				{
					message: 'User not found',
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(
			{
				result: user,
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
			},
			{
				status: 500,
			}
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const userID = getDataFromToken(request);
		const body = await request.json();

		const { name, username } = body;

		const usernameAlreadyTaken = await User.findOne({
			username,
			_id: {
				$ne: userID,
			},
		});

		if (usernameAlreadyTaken) {
			return NextResponse.json(
				{
					message: 'Username already taken',
				},
				{
					status: 400,
				}
			);
		}

		const user = await User.findByIdAndUpdate(
			{
				_id: userID,
			},
			{
				name,
				username,
			},
			{
				new: true,
			}
		).select('-password');

		if (!user) {
			return NextResponse.json(
				{
					message: 'User not found',
				},
				{
					status: 404,
				}
			);
		}

		return NextResponse.json(
			{
				result: user,
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
			},
			{
				status: 500,
			}
		);
	}
}
