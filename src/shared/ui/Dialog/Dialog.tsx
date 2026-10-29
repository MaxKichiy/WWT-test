import {
	type ComponentPropsWithoutRef,
	type MouseEvent,
	type PointerEvent,
	type SyntheticEvent,
	useEffect,
	useRef
} from 'react'

interface DialogProps
	extends Omit<ComponentPropsWithoutRef<'dialog'>, 'open' | 'onClose'> {
	open: boolean
	onClose: () => void
}

export const Dialog = ({
	open,
	onClose,
	className = '',
	children,
	...props
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const pressStartedOnBackdrop = useRef(false)

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) {
			return
		}
		if (open && !dialog.open) {
			dialog.showModal()
		} else if (!open && dialog.open) {
			dialog.close()
		}
	}, [open])

	const isOwnBackdrop = (e: SyntheticEvent<HTMLDialogElement>) =>
		e.target === e.currentTarget

	const handleClose = (e: SyntheticEvent<HTMLDialogElement>) => {
		if (isOwnBackdrop(e)) {
			onClose()
		}
	}

	const handlePointerDown = (e: PointerEvent<HTMLDialogElement>) => {
		pressStartedOnBackdrop.current = isOwnBackdrop(e)
	}

	const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (pressStartedOnBackdrop.current && isOwnBackdrop(e)) {
			e.currentTarget.close()
		}
		pressStartedOnBackdrop.current = false
	}

	return (
		<dialog
			ref={dialogRef}
			onClose={handleClose}
			onPointerDown={handlePointerDown}
			onClick={handleClick}
			className={`max-w-full w-full mt-auto sm:m-auto sm:max-w-[calc(100vw-10rem)] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white p-0 shadow-xl backdrop:bg-gray-900/50 ${className}`}
			{...props}
		>
			{children}
		</dialog>
	)
}
