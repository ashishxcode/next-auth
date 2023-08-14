'use client';
import React, { useState } from 'react';
import axios from 'axios';
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

const forgotPasswordLinkSchema = z.object({
	email: z.string({ required_error: 'Email is required' }).email(),
});

export const ForgotPasswordLink = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof forgotPasswordLinkSchema>>({
		resolver: zodResolver(forgotPasswordLinkSchema),
		defaultValues: {
			email: '',
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (data: z.infer<typeof forgotPasswordLinkSchema>) => {
		try {
			await axios.post('/api/auth/forgot-password', data);
			toast.success('Check your email for the reset link');
			router.push('/');
		} catch (err: any) {
			console.log('LOGIN ERROR', err);
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
				<p className='text-sm text-center'>
					<span className='me-1'>Remember your password?</span>
					<Link href='/login'>
						<span className='underline'>Login</span>
					</Link>
				</p>
			</Card>
		</section>
	);
};
