'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
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
import * as z from 'zod';

const schema = z.object({
	name: z.string({ required_error: 'Name is required' }),
	username: z.string({ required_error: 'Username is required' }),
	email: z.string({ required_error: 'Email is required' }).email(),
	password: z.string({ required_error: 'Password is required' }).min(8),
});

const SingUpPage = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
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

	const onSubmit = async (data: z.infer<typeof schema>) => {
		try {
			const response = await axios.post('/api/auth/signup', data);

			if (response.status === 201) {
				toast.success('Account created successfully');
				router.push('/login');
			}
		} catch (error: any) {
			console.log('SIGNUP ERROR', error);
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<section className='flex flex-col items-center justify-center min-h-screen py-2'>
			<Card className='w-full max-w-md p-4 rounded-xl'>
				<CardTitle className='text-center'>Sign Up</CardTitle>
				<CardContent className='py-4'>
					<Form {...form}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className='flex flex-col space-y-4'
						>
							<Controller
								name='name'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='name'>Name</FormLabel>
										<FormControl>
											<Input
												type='name'
												placeholder='eg: John Doe'
												{...field}
											/>
										</FormControl>
										{errors.name && (
											<FormDescription className='text-red-500'>
												{errors.name.message}
											</FormDescription>
										)}
									</FormItem>
								)}
							/>

							<Controller
								name='username'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='username'>Username</FormLabel>
										<FormControl>
											<Input type='text' placeholder='eg: johndoe' {...field} />
										</FormControl>
										{errors.username && (
											<FormDescription className='text-red-500'>
												{errors.username.message}
											</FormDescription>
										)}
									</FormItem>
								)}
							/>

							<Controller
								name='email'
								control={control}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor='email'>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='eg: johndoe@gmail.com'
												{...field}
											/>
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
												placeholder='eg: ********'
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

							<Button
								type='submit'
								variant='default'
								className={cn('w-full', {
									'opacity-50': isSubmitting,
								})}
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Processing...' : 'Sign Up'}
							</Button>
						</form>
					</Form>
				</CardContent>
				<div className='text-sm text-center'>
					<span className='text-gray-500 me-1'>Already have account ?</span>
					<Link href='/login'>
						<span className='text-gray-800 underline'>Login</span>
					</Link>
				</div>
			</Card>
		</section>
	);
};

export default SingUpPage;
