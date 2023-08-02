'use client';
import React, { useState } from 'react';
import axios from 'axios';
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
import { Checkbox } from '@/components/ui/checkbox';

const schema = z.object({
	password: z.string().min(8, 'Password must be at least 8 characters long'),
	confirmPassword: z
		.string()
		.min(8, 'Password must be at least 8 characters long'),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (data: FormValues) => {
		const { password, confirmPassword } = data;
		const payload = {
			newPassword: password,
		};
		try {
			await axios.patch('/api/auth/forgot-password', payload);
			toast.success('Check your email for the reset link');
			router.push('/');
		} catch (err: any) {
			console.log('FORGOT PASSWORD ERROR', err);
			toast.error(err.response.data.message);
		}
	};

	return (
		<section className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Card className='w-full max-w-md p-4 rounded-xl'>
				<CardTitle className='text-center mb-8'>Forgot Password</CardTitle>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col space-y-2'
						>
							<Controller
								name='password'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='password'>Password</FormLabel>
										<FormControl>
											<Input
												type={showPassword ? 'text' : 'password'}
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
							<Controller
								name='confirmPassword'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='confirmPassword'>
											Confirm Password
										</FormLabel>
										<FormControl>
											<Input
												type={showPassword ? 'text' : 'password'}
												placeholder='Confirm Password'
												{...field}
											/>
										</FormControl>
										{errors.confirmPassword && (
											<FormDescription className='text-red-500'>
												{errors.confirmPassword.message}
											</FormDescription>
										)}
									</FormItem>
								)}
							/>
							<div className='flex items-center space-x-2 py-2'>
								<Checkbox
									id='showPassword'
									checked={showPassword}
									onCheckedChange={() => setShowPassword(!showPassword)}
								/>
								<FormLabel htmlFor='showPassword' className='cursor-pointer'>
									Show Password
								</FormLabel>
							</div>

							<FormItem>
								<FormControl>
									<Button
										type='submit'
										className='w-full'
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Loading...' : 'Submit'}
									</Button>
								</FormControl>
							</FormItem>
						</form>
					</Form>
				</CardContent>
			</Card>
		</section>
	);
};
