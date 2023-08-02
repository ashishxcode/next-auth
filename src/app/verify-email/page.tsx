'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const VerifyEmailPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [token, setToken] = useState('');
	const [userId, setUserId] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const urlToken = searchParams.get('token') || '';
		const userId = searchParams.get('userId') || '';
		setToken(urlToken);
		setUserId(userId);
	}, [searchParams]);

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const res = await axios.post('/api/auth/verify-email', {
					token,
					userId,
				});
				router.push('/dashboard');
				toast.success(res.data.message);
				setMessage(res.data.message);
			} catch (err: any) {
				console.log(err);
				setMessage(err.response.data.error);
			}
		};

		if (token.length > 0) {
			verifyEmail();
		}
	}, [token, userId, router]);

	return (
		<div className='w-full h-screen flex flex-col justify-center items-center'>
			<h1 className='text-2xl font-bold'>Verify Email</h1>
			<p>{message}</p>
			<Button
				className='mt-4'
				onClick={() => {
					router.push('/');
				}}
			>
				Go to Home
			</Button>
		</div>
	);
};

export default VerifyEmailPage;
