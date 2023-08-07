import React from 'react';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormItem,
	FormDescription,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-separator';

interface UserData {
	name: string;
	email: string;
	username: string;
	profile_picture: string;
}

const profileSchema = z.object({
	name: z.string().optional(),
	username: z.string().optional(),
});

export const ProfileForm = ({ userData }: { userData: UserData }) => {
	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: userData.name,
			username: userData.username,
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = form;

	const onSubmit = async (data: z.infer<typeof profileSchema>) => {
		console.log(data);
	};

	return (
		<>
			<div>
				<h2 className='text-lg font-700 tracking-tight'>Profile</h2>
				<p className='text-sm text-muted-foreground'>
					This is how others will see you on the site.
				</p>
			</div>
			<Separator className='my-6' />
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='John Doe' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='johndoe' {...field} />
								</FormControl>
								<FormDescription>
									Your username is how other people will find you.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div>
						<Button
							type='submit'
							disabled={isSubmitting}
							size='sm'
							className='mt-2'
						>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
