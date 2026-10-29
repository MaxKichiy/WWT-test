import { create } from 'zustand'

import type { SearchRequestFilter } from '@shared/api'

interface SelectedFiltersState {
	selected: SearchRequestFilter
	setSelected: (selected: SearchRequestFilter) => void
}

export const useSelectedFiltersStore = create<SelectedFiltersState>()(set => ({
	selected: [],
	setSelected: selected => set({ selected })
}))
