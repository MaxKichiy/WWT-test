import { useId } from 'react'
import { useNavigate } from 'react-router-dom'

import { FilterForm } from '@features/apply-filters'
import { ROUTES } from '@shared/config'

export const FiltersPage = () => {
	const navigate = useNavigate()
	const titleId = useId()
	const goHome = () => navigate(ROUTES.home)

	return (
		<main className="mx-auto max-w-4xl p-4 sm:p-6">
			<section
				aria-labelledby={titleId}
				className="rounded-2xl bg-white shadow"
			>
				<FilterForm
					titleId={titleId}
					onApplied={goHome}
					onCancel={goHome}
				/>
			</section>
		</main>
	)
}
