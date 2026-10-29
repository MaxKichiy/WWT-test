import { type FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	FilterOptionGroup,
	toSearchRequest,
	useFilters,
	useSelectedFiltersStore
} from '@entities/filter'
import { Button, ConfirmDialog, DialogHeader } from '@shared/ui'

import { useFilterDraft } from '../model/useFilterDraft'

interface FilterFormProps {
	titleId: string
	onApplied: () => void
	onCancel: () => void
	className?: string
}

export const FilterForm = ({
	titleId,
	onApplied,
	onCancel,
	className = ''
}: FilterFormProps) => {
	const { t } = useTranslation('filter')
	const { data: filters, isPending, isError } = useFilters()
	const setSelected = useSelectedFiltersStore(state => state.setSelected)
	const { draft, setGroup, clear, reset, isEmptyDraft, isDirty } =
		useFilterDraft()

	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsConfirmOpen(true)
	}

	const handleConfirm = () => {
		if (filters) {
			setSelected(toSearchRequest(draft, filters))
		}
		setIsConfirmOpen(false)
		onApplied()
	}

	const handleKeepOld = () => {
		reset()
		setIsConfirmOpen(false)
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={`flex flex-col gap-8 p-5 sm:px-8 sm:py-10 border-y border-[#B4B4B4]  ${className}`}
			>
				<DialogHeader
					title={t('title')}
					titleId={titleId}
					onClose={onCancel}
					closeLabel={t('close')}
					className="border-b border-[#B4B4B4] "
				/>

				<div className="flex-1 overflow-y-auto mx-[-2rem] px-8 space-y-8 [scrollbar-gutter:stable]">
					{isPending && <p className="py-6 text-gray-500">{t('loading')}</p>}
					{isError && <p className="py-6 text-red-600">{t('error')}</p>}
					{filters?.map(filter => (
						<FilterOptionGroup
							key={filter.id}
							filter={filter}
							selectedIds={draft[filter.id] ?? []}
							onChange={ids => setGroup(filter.id, ids)}
						/>
					))}
				</div>

				<footer className="flex flex-col gap-4 sm:gap-0 sm:flex-row relative items-center justify-center  border-t border-[#B4B4B4] pt-8">
					<Button
						type="submit"
						disabled={!isDirty}
					>
						{t('apply')}
					</Button>
					<Button
						variant="link"
						onClick={clear}
						className="sm:absolute right-0"
						disabled={isEmptyDraft}
					>
						{t('clearAll')}
					</Button>
				</footer>
			</form>

			<ConfirmDialog
				open={isConfirmOpen}
				title={t('confirm.title')}
				confirmLabel={t('confirm.accept')}
				cancelLabel={t('confirm.cancel')}
				onConfirm={handleConfirm}
				onCancel={handleKeepOld}
				onDismiss={() => setIsConfirmOpen(false)}
			/>
		</>
	)
}
