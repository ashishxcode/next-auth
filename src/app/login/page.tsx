'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
	const [user, setUser] = React.useState({
		email: '',
		password: '',
	});

	const onLogin = async () => {
		console.log('user', user);
	};

	return (
		<section className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-4xl font-700 text-center mb-8'>Login</h1>
			<hr />

			<div className='flex flex-col items-center justify-center w-full px-20 max-w-2xl'>
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
					onClick={onLogin}
				>
					Login
				</button>
				<Link href='/signup' className='text-indigo-500'>
					Already have an account? Login
				</Link>
			</div>
		</section>
	);
};

export default LoginPage;
