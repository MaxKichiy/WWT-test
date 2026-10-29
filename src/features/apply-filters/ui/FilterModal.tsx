import { useId, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog } from '@shared/ui'

import { FilterForm } from './FilterForm'

export const FilterModal = () => {
	const navigate = useNavigate()
	const titleId = useId()
	const [isOpen, setIsOpen] = useState(true)
	const close = () => setIsOpen(false)

	return (
		<Dialog
			open={isOpen}
			onClose={() => navigate(-1)}
			aria-labelledby={titleId}
			className="w-full"
		>
			<FilterForm
				titleId={titleId}
				onApplied={close}
				onCancel={close}
				className="max-h-[90dvh]"
			/>
		</Dialog>
	)
}
