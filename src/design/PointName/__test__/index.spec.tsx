import { render } from '@testing-library/react'
import PointName from '..';

describe('<PointName />', () => {
    it('should render properly', () => {
        const { getByText } = render(<PointName name='anything' />)

        expect(getByText('anything')).toBeInTheDocument()
    });
});