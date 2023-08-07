'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from '@/app/dashboard/components/profile-form';
import { SidebarNav } from '@/app/dashboard/components/sidebar-nav';

interface UserData {
	name: string;
	email: string;
	username: string;
	profile_picture: string;
}

const sideNavItems = [
	{
		title: 'Profile',
		value: 'profile',
	},
	{
		title: 'Account',
		value: 'account',
	},
	{
		title: 'Danger Zone',
		value: 'danger-zone',
	},
];

const Dashboard = () => {
	const [userData, setUserData] = useState<UserData>({
		name: '',
		email: '',
		username: '',
		profile_picture: '',
	});
	const [fetchLoading, setFetchLoading] = useState(false);
	const [activeTab, setActiveTab] = useState(sideNavItems[0].value);

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

	function renderTab() {
		switch (activeTab) {
			case 'profile':
				return <ProfileForm userData={userData} />;
			case 'account':
				return <p>Account</p>;
			case 'danger-zone':
				return <p>Danger Zone</p>;
			default:
				return <ProfileForm userData={userData} />;
		}
	}

	return (
		<div>
			{fetchLoading ? (
				<p className='text-2xl font-bold'>Loading...</p>
			) : (
				<>
					<div className='space-y-2 p-8 pb-16'>
						<div className='space-y-0.5'>
							<h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>
							<p className='text-muted-foreground'>
								Manage your account settings.
							</p>
						</div>
						<Separator className='my-6' />
						<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
							<aside className='lg:w-1/5'>
								<SidebarNav
									items={sideNavItems}
									activeTab={activeTab}
									setActiveTab={setActiveTab}
								/>
							</aside>
							<div className='flex-1 lg:max-w-2xl'>{renderTab()}</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Dashboard;
