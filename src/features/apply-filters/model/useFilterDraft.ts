import { useState } from 'react'

import {
	type FilterSelection,
	isSameSelection,
	toSelection,
	useSelectedFiltersStore
} from '@entities/filter'

export const useFilterDraft = () => {
	const selected = useSelectedFiltersStore(state => state.selected)
	const [draft, setDraft] = useState<FilterSelection>(() =>
		toSelection(selected)
	)

	const isEmptyDraft =
		Object.values(draft).reduce((acc, curr) => acc + curr.length, 0) === 0

	const isDirty = !isSameSelection(draft, toSelection(selected))

	const setGroup = (filterId: string, optionIds: string[]) =>
		setDraft(prev => ({ ...prev, [filterId]: optionIds }))

	const clear = () => setDraft({})

	const reset = () => setDraft(toSelection(selected))

	return { draft, setGroup, clear, reset, isEmptyDraft, isDirty }
}
