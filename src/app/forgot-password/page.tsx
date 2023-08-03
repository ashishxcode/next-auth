'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ForgotPasswordLink } from './components/ForgotPasswordLink';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';

const ForgotPassword = () => {
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [isFormEnabled, setIsFormEnabled] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		const token = searchParams.get('token');
		const userId = searchParams.get('userId');
		if (token && userId) {
			setToken(token);
			setUserId(userId);
			setIsFormEnabled(true);
		}
	}, [searchParams]);

	return (
		<div>
			{isFormEnabled ? (
				<ForgotPasswordForm token={token} userId={userId} />
			) : (
				<ForgotPasswordLink />
			)}
		</div>
	);
};

export default ForgotPassword;
