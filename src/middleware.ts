import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface PathAccessControl {
	[key: string]: 'public' | 'private';
}

const PATH_ACCESS_CONTROL: PathAccessControl = {
	'/': 'private',
	'/login': 'public',
	'/signup': 'public',
	'/profile': 'private',
	'/dashboard': 'private',
};

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const token = request.cookies.get('token')?.value ?? '';
	const access = PATH_ACCESS_CONTROL[path] || 'public';

	if (access === 'public' && token !== '') {
		return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
	}

	if (access === 'private' && token === '') {
		return NextResponse.redirect(new URL('/login', request.nextUrl));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/', '/login', '/signup', '/dashboard', '/profile:path*'],
};
