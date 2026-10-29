import type { Location } from 'react-router-dom'

export const ROUTES = {
	home: '/',
	filters: '/filters'
} as const

export interface ModalRouteState {
	background?: Location
}
