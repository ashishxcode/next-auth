'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface UserData {
	name: string;
	email: string;
	username: string;
	profile_picture: string;
}

const ProfilePage = () => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		username: '',
		profile_picture: '',
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
		<div className=''>
			{fetchLoading ? (
				<p className='text-2xl font-bold'>Loading...</p>
			) : (
				<>
					<nav className='flex items-center justify-between w-full px-4 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
						<Image
							src='/vercel.svg'
							alt='Vercel Logo'
							className='dark:invert'
							width={100}
							height={24}
							priority
						/>

						<DropdownMenu>
							<DropdownMenuTrigger className='focus:outline-none'>
								<Avatar>
									<AvatarImage
										src={userData.profile_picture}
										alt={userData.name}
									/>
									<AvatarFallback>{userData.name[0]}</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Profile</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={logout}>
									<span>Logout</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</nav>
					<main className='p-4'>
						<h1 className='text-xl font-semibold text-start text-gray-800'>
							Welcome {userData.name}
						</h1>
					</main>
				</>
			)}
		</div>
	);
};

export default ProfilePage;
