'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
	const [loading, setLoading] = React.useState(false);

	const router = useRouter();
	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/api/auth/logout');
			if (res.data.success) {
				router.push('/');
				toast.success(res.data.message);
			}
		} catch (error: any) {
			toast.error(error.response.data);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen'>
			<h1 className='text-2xl font-semibold text-center text-gray-800'>
				Profile Page
			</h1>
			<Button className='mt-4' onClick={logout} disabled={loading}>
				Logout
			</Button>
		</div>
	);
};

export default ProfilePage;
