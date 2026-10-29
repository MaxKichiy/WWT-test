export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'lg' | 'md' | 'sm'

export interface ButtonStyleOptions {
	variant?: ButtonVariant
	size?: ButtonSize
	icon?: boolean
	className?: string
}

const base =
	'inline-flex items-center justify-center gap-2 rounded-2xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed  disabled:text-[#7E7E7E]'

const variants: Record<ButtonVariant, string> = {
	primary:
		'bg-[#FF5F00] font-semibold text-base! text-white hover:bg-[#FF9E59] active:bg-[#FF3D00] disabled:bg-[#F4F4F4]',
	secondary:
		'border border-[#B4B4B4] bg-white font-semibold text-[#474747] hover:bg-gray-50 disabled:bg-[#F4F4F4]',
	ghost: 'font-semibold text-gray-600 hover:bg-[#F3F3F3]',
	link: 'text-[20px] font-medium text-[#078691] underline hover:text-[#7E7E7E] active:text-[#31393C] cursor-pointer disabled:bg-none!'
}

const sizes: Record<ButtonSize, string> = {
	lg: 'h-12 px-18 text-base sm:h-16 sm:px-17 sm:text-lg',
	md: 'h-12 px-5 text-base',
	sm: 'h-10 px-4 text-sm'
}

const iconSizes: Record<ButtonSize, string> = {
	lg: 'size-12 sm:size-16',
	md: 'size-4 sm:size-12',
	sm: 'size-10'
}

const sizeClassName = (
	variant: ButtonVariant,
	size: ButtonSize,
	icon: boolean
) => {
	if (variant === 'link') {
		return ''
	}
	return icon ? iconSizes[size] : sizes[size]
}

export const buttonClassName = ({
	variant = 'primary',
	size = 'lg',
	icon = false,
	className = ''
}: ButtonStyleOptions = {}) =>
	`${base} ${variants[variant]} ${sizeClassName(variant, size, icon)} ${className}`
