'use client';

import React from 'react';
import Link from 'next/link';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import axios from 'axios';

const loginSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }).min(8),
});

const LoginPage = () => {
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

	function onSubmit(data: z.infer<typeof loginSchema>) {
		console.log(data);
	}

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
										className={cn('w-full', {
											'bg-blue-500': isSubmitting,
										})}
									>
										{isSubmitting ? 'Logging in...' : 'Login'}
									</Button>
								</FormControl>
							</FormItem>
						</form>
					</Form>
				</CardContent>
				<div className='flex flex-col items-center justify-center space-y-2'>
					<span className='text-sm text-gray-500'>Create a free account </span>
					<Link href='/signup'>
						<span className='text-sm text-blue-500 hover:underline'>
							Sign up
						</span>
					</Link>
				</div>
			</Card>
		</section>
	);
};

export default LoginPage;
