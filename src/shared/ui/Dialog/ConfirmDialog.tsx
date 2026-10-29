import { useId } from 'react'

import { Button } from '../Button/Button'
import { Dialog } from './Dialog'
import { DialogHeader } from './DialogHeader'

interface ConfirmDialogProps {
	open: boolean
	title: string
	confirmLabel: string
	cancelLabel: string
	onConfirm: () => void
	onCancel: () => void
	onDismiss: () => void
}

export const ConfirmDialog = ({
	open,
	title,
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel,
	onDismiss
}: ConfirmDialogProps) => {
	const titleId = useId()

	return (
		<Dialog
			open={open}
			onClose={onDismiss}
			role="alertdialog"
			aria-labelledby={titleId}
			className="w-full"
		>
			<div className="flex flex-col gap-8 p-5 sm:px-8 sm:py-8">
				<DialogHeader
					title={title}
					titleId={titleId}
					onClose={onDismiss}
				/>
				<div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-8 sm:mt-14">
					<Button
						variant="secondary"
						onClick={onCancel}
					>
						{cancelLabel}
					</Button>
					<Button
						onClick={onConfirm}
						autoFocus
					>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</Dialog>
	)
}
