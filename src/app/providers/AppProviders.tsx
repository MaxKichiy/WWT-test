import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@shared/api'

export const AppProviders = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>{children}</BrowserRouter>
	</QueryClientProvider>
)
