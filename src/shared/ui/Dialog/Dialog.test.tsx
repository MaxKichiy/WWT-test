import { fireEvent, render, screen } from '@testing-library/react'

import { Dialog } from './Dialog'

beforeAll(() => {
	HTMLDialogElement.prototype.showModal = function showModal(
		this: HTMLDialogElement
	) {
		this.setAttribute('open', '')
	}
	HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
		this.removeAttribute('open')
		this.dispatchEvent(new Event('close'))
	}
})

const INNER_TEXT = 'inner content'

const renderNested = () => {
	const onOuterClose = vi.fn()
	const onInnerClose = vi.fn()
	render(
		<Dialog
			open
			onClose={onOuterClose}
			data-testid="outer"
		>
			<div>
				<Dialog
					open
					onClose={onInnerClose}
					data-testid="inner"
				>
					<p>{INNER_TEXT}</p>
				</Dialog>
			</div>
		</Dialog>
	)
	return { onOuterClose, onInnerClose }
}

describe('Dialog', () => {
	it('closing a nested dialog does not close its parent', () => {
		const { onOuterClose, onInnerClose } = renderNested()

		fireEvent.pointerDown(screen.getByTestId('inner'))
		fireEvent.click(screen.getByTestId('inner'))

		expect(onInnerClose).toHaveBeenCalledTimes(1)
		expect(onOuterClose).not.toHaveBeenCalled()
	})

	it('ignores a press that starts inside and ends on the backdrop', () => {
		const { onInnerClose } = renderNested()

		fireEvent.pointerDown(screen.getByText(INNER_TEXT))
		fireEvent.click(screen.getByTestId('inner'))

		expect(onInnerClose).not.toHaveBeenCalled()
	})
})
