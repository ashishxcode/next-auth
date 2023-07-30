'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';

const ProfilePage = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		username: '',
	});
	const [fetchLoading, setFetchLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUserData = async () => {
			try {
				setFetchLoading(true);

				const res = await axios.get('/api/users/me');
				if (res.data.success) {
					setUserData(res.data.result);
				}
			} catch (error: any) {
				toast.error(error.response.data);
			} finally {
				setFetchLoading(false);
			}
		};

		getUserData();
	}, []);

	const router = useRouter();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/api/auth/logout');
			if (res.data.success) {
				router.push('/login');
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
			{fetchLoading ? (
				<p className='text-2xl font-bold'>Loading...</p>
			) : (
				<>
					<h1 className='text-2xl font-semibold text-center text-gray-800'>
						Welcome {userData.name}
					</h1>
					<Button className='mt-4' onClick={logout} disabled={loading}>
						Logout
					</Button>
				</>
			)}
		</div>
	);
};

export default ProfilePage;
