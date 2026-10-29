import { Route, Routes, useLocation } from 'react-router-dom'

import { FilterModal } from '@features/apply-filters'
import { FiltersPage } from '@pages/filters'
import { HomePage } from '@pages/home'
import { NotFoundPage } from '@pages/not-found'
import { type ModalRouteState, ROUTES } from '@shared/config'

export const AppRouter = () => {
	const location = useLocation()
	const background = (location.state as ModalRouteState | null)?.background

	return (
		<>
			<Routes location={background ?? location}>
				<Route
					path={ROUTES.home}
					element={<HomePage />}
				/>
				<Route
					path={ROUTES.filters}
					element={<FiltersPage />}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>

			{background && (
				<Routes>
					<Route
						path={ROUTES.filters}
						element={<FilterModal />}
					/>
				</Routes>
			)}
		</>
	)
}
