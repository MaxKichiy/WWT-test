import { queryOptions, useQuery } from '@tanstack/react-query'

import type { FilterItem } from '@shared/api'

const fetchFilters = async (): Promise<FilterItem[]> => {
	const { default: data } = await import('@shared/temp/filterData.json')
	return data.filterItems as FilterItem[]
}

export const filtersQueryOptions = queryOptions({
	queryKey: ['filters'],
	queryFn: fetchFilters,
	staleTime: Infinity
})

export const useFilters = () => useQuery(filtersQueryOptions)
