import { ComponentPropsWithoutRef } from 'react'

import { ButtonStyleOptions, buttonClassName } from './buttonStyles'

interface ButtonProps
	extends ComponentPropsWithoutRef<'button'>,
		ButtonStyleOptions {}

export const Button = ({
	variant,
	size,
	icon,
	className,
	type = 'button',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={buttonClassName({ variant, size, icon, className })}
		{...props}
	/>
)
