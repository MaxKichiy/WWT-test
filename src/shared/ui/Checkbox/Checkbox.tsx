import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import CheckboxSelectedIcon from '@assets/icons/checkbox.selected.svg'
import CheckboxIcon from '@assets/icons/checkbox.svg'

interface CheckboxProps
	extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'className'> {
	label: ReactNode
	className?: string
}

const iconState =
	'size-6 shrink-0 rounded-md text-[#31393C] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange-500 peer-disabled:text-[#B4B4B4]'

export const Checkbox = ({
	label,
	className = '',
	title,
	...props
}: CheckboxProps) => (
	<label
		className={`group relative flex cursor-pointer items-start gap-3 has-disabled:cursor-not-allowed ${className}`}
		title={title}
	>
		<input
			type="checkbox"
			className="peer sr-only"
			{...props}
		/>
		<CheckboxIcon
			aria-hidden
			className={`${iconState} group-hover:peer-enabled:fill-[#F4F4F4] peer-checked:hidden`}
		/>
		<CheckboxSelectedIcon
			aria-hidden
			className={`${iconState} hidden peer-checked:block`}
		/>
		<span className="text-base text-[#31393C]">{label}</span>
	</label>
)
