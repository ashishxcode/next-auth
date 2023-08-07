'use client';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		value: string;
		title: string;
	}[];
	activeTab: string;
	setActiveTab: (value: string) => void;
}

export function SidebarNav({
	className,
	items,
	activeTab,
	setActiveTab,
	...props
}: SidebarNavProps) {
	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	return (
		<nav
			className={cn(
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<Button
					key={item.value}
					onClick={() => handleTabChange(item.value)}
					className={cn(
						activeTab === item.value
							? 'bg-primary text-white'
							: 'bg-white text-primary',
						'transition-all ease-in-out duration-200 border-bottom-2 justify-start hover:border-primary hover:text-white'
					)}
				>
					{item.title}
				</Button>
			))}
		</nav>
	);
}
