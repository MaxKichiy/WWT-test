import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { useSelectedFiltersStore } from '@entities/filter'
import { type ModalRouteState, ROUTES } from '@shared/config'
import { buttonClassName } from '@shared/ui'

export const HomePage = () => {
	const { t } = useTranslation('home')
	const location = useLocation()
	const selected = useSelectedFiltersStore(state => state.selected)

	const modalState: ModalRouteState = { background: location }

	return (
		<main className="mx-auto flex min-h-dvh max-w-4xl flex-col gap-8 p-6">
			<header className="flex flex-wrap items-center sm:justify-between justify-center gap-4">
				<h1 className="text-3xl font-semibold">{t('title')}</h1>
				<Link
					to={ROUTES.filters}
					state={modalState}
					className={buttonClassName({ variant: 'primary' })}
				>
					{t('openFilters')}
				</Link>
			</header>

			<section>
				<h2 className="text-lg font-semibold text-gray-700">
					{t('selectedFilters')}
				</h2>
				<pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
					<code>{JSON.stringify(selected, null, 2)}</code>
				</pre>
			</section>
		</main>
	)
}
