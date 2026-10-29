import type { FilterItem } from '@shared/api'
import { Checkbox } from '@shared/ui'

interface FilterOptionGroupProps {
	filter: FilterItem
	selectedIds: string[]
	onChange: (selectedIds: string[]) => void
}

export const FilterOptionGroup = ({
	filter,
	selectedIds,
	onChange
}: FilterOptionGroupProps) => {
	const toggle = (optionId: string, checked: boolean) =>
		onChange(
			checked
				? [...selectedIds, optionId]
				: selectedIds.filter(id => id !== optionId)
		)

	return (
		<fieldset className="border-b border-[#B4B4B4] last:border-b-0 pb-8">
			<legend className="text-2xl font-medium mb-6">{filter.name}</legend>
			<ul className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
				{filter.options.map(option => (
					<li key={option.id}>
						<Checkbox
							label={option.name}
							title={option.description}
							name={filter.id}
							value={option.id}
							checked={selectedIds.includes(option.id)}
							onChange={e => toggle(option.id, e.target.checked)}
						/>
					</li>
				))}
			</ul>
		</fieldset>
	)
}
