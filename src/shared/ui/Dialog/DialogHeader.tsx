import type { ReactNode } from 'react'

import CloseIcon from '@assets/icons/close.svg'

import { Button } from '../Button/Button'

interface DialogHeaderProps {
	title: ReactNode
	titleId: string
	onClose?: () => void
	closeLabel?: string
	className?: string
}

export const DialogHeader = ({
	title,
	titleId,
	onClose,
	closeLabel,
	className = ''
}: DialogHeaderProps) => (
	<header className={`pb-8 ${className}`}>
		<div className="relative flex items-center justify-center">
			<h2
				id={titleId}
				className={`text-center text-[20px] leading-[20px] sm:text-[40px] sm:leading-[48px] font-medium text-gray-900 ${onClose ? 'px-14' : ''}`}
			>
				{title}
			</h2>
			{onClose && (
				<Button
					variant="ghost"
					size="md"
					icon
					onClick={onClose}
					aria-label={closeLabel}
					className="absolute top-1/2 right-0 -translate-y-1/2"
				>
					<CloseIcon
						aria-hidden
						className="text-[#31393C]"
					/>
				</Button>
			)}
		</div>
	</header>
)
