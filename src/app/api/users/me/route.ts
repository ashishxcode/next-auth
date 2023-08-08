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
					error: 'User not found',
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
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json();

		const { userID, ...rest } = body;

		const user = await User.findByIdAndUpdate(
			{
				_id: userID,
			},
			{
				$set: {
					...rest,
				},
			},
			{
				new: true,
			}
		);

		if (!user) {
			return NextResponse.json(
				{
					error: 'User not found',
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
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
