import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
	id: string;
	name: string;
	email: string;
	username: string;
}

export function getDataFromToken(request: NextRequest) {
	try {
		const token = request.cookies.get('token')?.value ?? '';

		const decodedToken = jwt.verify(
			token,
			process.env.TOKEN_SECRET!
		) as DecodedToken;

		return decodedToken.id as string;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
