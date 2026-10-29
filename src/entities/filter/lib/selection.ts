import {
	type FilterItem,
	FilterType,
	type SearchRequestFilter
} from '@shared/api'

export type FilterSelection = Record<string, string[]>

export const toSelection = (request: SearchRequestFilter): FilterSelection =>
	Object.fromEntries(request.map(item => [item.id, item.optionsIds]))

export const toSearchRequest = (
	selection: FilterSelection,
	filters: FilterItem[]
): SearchRequestFilter =>
	filters
		.map(filter => {
			const chosen = selection[filter.id] ?? []
			return {
				id: filter.id,
				type: FilterType.OPTION as const,
				optionsIds: filter.options
					.map(option => option.id)
					.filter(optionId => chosen.includes(optionId))
			}
		})
		.filter(item => item.optionsIds.length > 0)

export const isSameSelection = (
	first: FilterSelection,
	second: FilterSelection
): boolean => {
	const filterIds = new Set([...Object.keys(first), ...Object.keys(second)])
	return [...filterIds].every(filterId => {
		const firstIds = new Set(first[filterId] ?? [])
		const secondIds = new Set(second[filterId] ?? [])
		return (
			firstIds.size === secondIds.size &&
			[...firstIds].every(optionId => secondIds.has(optionId))
		)
	})
}
