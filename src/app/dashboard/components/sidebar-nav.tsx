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
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2',
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<Button
					key={item.value}
					onClick={() => handleTabChange(item.value)}
					variant={activeTab === item.value ? 'default' : 'ghost'}
				>
					{item.title}
				</Button>
			))}
		</nav>
	);
}
