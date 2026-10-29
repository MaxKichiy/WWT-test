import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/config'
import { buttonClassName } from '@shared/ui'

export const NotFoundPage = () => {
	const { t } = useTranslation('not-found')

	return (
		<main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
			<h1 className="text-4xl font-semibold text-gray-700">{t('text')}</h1>
			<Link
				to={ROUTES.home}
				className={buttonClassName({ variant: 'secondary' })}
			>
				{t('backHome')}
			</Link>
		</main>
	)
}
