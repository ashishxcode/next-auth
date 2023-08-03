'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormLabel,
	FormItem,
	FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }).min(8),
});

const LoginPage = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		try {
			await axios.post('/api/auth/login', data);
			toast.success('Login successful');
			router.push('/profile');
		} catch (err: any) {
			console.log('LOGIN ERROR', err);
			toast.error(err.response.data.message);
		}
	};

	return (
		<section className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Card className='w-full max-w-md p-4 rounded-xl'>
				<CardTitle className='text-center'>Login</CardTitle>
				<CardContent className='py-4'>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col space-y-4'
						>
							<Controller
								name='email'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='email'>Email</FormLabel>
										<FormControl>
											<Input type='email' placeholder='Email' {...field} />
										</FormControl>
										{errors.email && (
											<FormDescription className='text-red-500'>
												{errors.email.message}
											</FormDescription>
										)}
									</FormItem>
								)}
							/>
							<Controller
								name='password'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='password'>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='Password'
												{...field}
											/>
										</FormControl>
										{errors.password && (
											<FormDescription className='text-red-500'>
												{errors.password.message}
											</FormDescription>
										)}
									</FormItem>
								)}
							/>
							<FormItem>
								<FormControl>
									<Button
										type='submit'
										className='w-full'
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Logging in...' : 'Login'}
									</Button>
								</FormControl>
							</FormItem>
						</form>
					</Form>
				</CardContent>

				<div className='flex flex-col items-center gap-2 text-sm text-center'>
					<Link href='/forgot-password'>
						<span className='text-gray-900'>Forgot Password?</span>
					</Link>
				</div>
			</Card>
		</section>
	);
};

export default LoginPage;
