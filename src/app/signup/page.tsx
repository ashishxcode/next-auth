'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SingUpPage = () => {
	const [user, setUser] = React.useState({
		name: '',
		username: '',
		email: '',
		password: '',
	});

	const onSignUp = async () => {
		console.log('user', user);
	};

	return (
		<section className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-4xl font-700 text-center mb-8'>Sign Up</h1>
			<hr />

			<div className='flex flex-col items-center justify-center w-full px-20 max-w-2xl'>
				<div className='flex flex-row items-center justify-center w-full gap-4'>
					<div className='flex-1 flex flex-col w-full'>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							type='text'
							className='px-4 py-2 mb-4 border  rounded-[10px] text-gray-800'
							value={user.name}
							placeholder='eg. John Doe'
							onChange={(e) =>
								setUser((prev) => ({ ...prev, name: e.target.value }))
							}
						/>
					</div>
					<div className='flex-1 flex flex-col w-full'>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							type='text'
							className='px-4 py-2 mb-4 border  rounded-[10px] text-gray-800'
							value={user.username}
							placeholder='eg. johndoe'
							onChange={(e) =>
								setUser((prev) => ({ ...prev, username: e.target.value }))
							}
						/>
					</div>
				</div>
				<div className='flex flex-col w-full'>
					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						className='px-4 py-2 mb-4 border rounded-[10px] text-gray-800'
						value={user.email}
						placeholder='eg. johndoe@gmail.com'
						onChange={(e) =>
							setUser((prev) => ({ ...prev, email: e.target.value }))
						}
					/>
				</div>
				<div className='flex flex-col w-full '>
					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						className='px-4 py-2 mb-4 border  rounded-[10px] text-gray-800'
						value={user.password}
						placeholder='********'
						onChange={(e) =>
							setUser((prev) => ({ ...prev, password: e.target.value }))
						}
					/>
				</div>
				<button
					className='w-full px-4 py-2 mb-4 border rounded-[10px] hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200 ease-in-out'
					onClick={onSignUp}
				>
					Sign Up
				</button>
				<Link href='/login' className='text-indigo-500'>
					Already have an account? Login
				</Link>
			</div>
		</section>
	);
};

export default SingUpPage;
