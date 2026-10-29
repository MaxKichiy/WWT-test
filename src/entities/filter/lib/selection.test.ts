import type { FilterItem } from '@shared/api'

import { isSameSelection, toSearchRequest, toSelection } from './selection'

const filters = [
	{
		id: 'MEAL',
		name: 'Meal',
		type: 'OPTION',
		options: [
			{ id: 'breakfast', name: 'Breakfast' },
			{ id: 'dinner', name: 'Dinner' }
		]
	},
	{
		id: 'BED',
		name: 'Bed',
		type: 'OPTION',
		options: [{ id: 'twin', name: 'Twin' }]
	}
] as FilterItem[]

describe('toSearchRequest', () => {
	it('keeps API order, drops empty groups and unknown ids', () => {
		expect(
			toSearchRequest(
				{ BED: [], MEAL: ['dinner', 'unknown', 'breakfast'], OTHER: ['x'] },
				filters
			)
		).toEqual([
			{ id: 'MEAL', type: 'OPTION', optionsIds: ['breakfast', 'dinner'] }
		])
	})

	it('round-trips through toSelection', () => {
		const request = toSearchRequest(
			{ MEAL: ['dinner'], BED: ['twin'] },
			filters
		)
		expect(toSearchRequest(toSelection(request), filters)).toEqual(request)
	})
})

describe('isSameSelection', () => {
	it('ignores option order and empty groups', () => {
		expect(
			isSameSelection(
				{ MEAL: ['dinner', 'breakfast'], BED: [] },
				{ MEAL: ['breakfast', 'dinner'] }
			)
		).toBe(true)
	})

	it('detects added, removed and moved options', () => {
		const saved = { MEAL: ['breakfast'] }
		expect(isSameSelection({ MEAL: ['breakfast', 'dinner'] }, saved)).toBe(
			false
		)
		expect(isSameSelection({}, saved)).toBe(false)
		expect(isSameSelection({ BED: ['breakfast'] }, saved)).toBe(false)
	})
})
